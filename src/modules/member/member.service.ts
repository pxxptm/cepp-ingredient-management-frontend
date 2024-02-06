import { Inject, Injectable, forwardRef } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './schema/member.schema';
import { UserService } from '../user/user.service';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: mongoose.Model<Member>,

    @Inject(forwardRef(() => RestaurantService))
    private readonly restaurantService: RestaurantService,

    private readonly userService: UserService,
  ) {}

  async create(userId: string, restaurantId: string) {
    const createdMember = new this.memberModel({
      userId: userId,
      restaurantId: restaurantId,
    });
    await createdMember.save();
    return createdMember;
  }

  async getUsersByRestaurantId(restaurantId: string) {
    const members = await this.findByRestaurantId(restaurantId);
    const userPromises = members.map(async (member) => {
      var user = await this.userService.getByIdReturnValidData(member.userId);
      return user;
    });
    const users = await Promise.all(userPromises);
    return users;
  }

  async getRestaurantsByUserId(userId: string) {
    const members = await this.findByUserId(userId);
    const restaurantPromise = members.map(async (member) => {
      var restaurant = await this.restaurantService.findOneById(
        member.restaurantId,
      );
      return restaurant;
    });
    const restaurants = await Promise.all(restaurantPromise);
    return restaurants;
  }

  async findByRestaurantId(restaurantId: string) {
    return await this.memberModel.find({ restaurantId: restaurantId });
  }

  async findByUserId(userId: string) {
    return await this.memberModel.find({ userId: userId });
  }

  async deleteUser(userId: string, restaurantId: string) {
    return await this.memberModel.findOneAndDelete({
      userId: userId,
      restaurantId: restaurantId,
    });
  }
}
