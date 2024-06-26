import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Restaurant } from './schema/restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';
import { MemberService } from '../member/member.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: mongoose.Model<Restaurant>,

    @Inject(forwardRef(() => MemberService))
    private readonly memberService: MemberService,

    private readonly userService: UserService,
  ) {}

  async create(userId: string, creatRestaurantDto: CreateRestaurantDto) {
    const createdRestaurant = new this.restaurantModel(creatRestaurantDto);
    await createdRestaurant.save();
    this.memberService.create(userId, createdRestaurant.id);
    return createdRestaurant;
  }

  async findOneById(restaurantId: string) {
    return await this.restaurantModel.findById(restaurantId);
  }

  async update(restaurantId: string, updaterestaurantDto: UpdateRestaurantDto) {
    return await this.restaurantModel.findByIdAndUpdate(
      restaurantId,
      updaterestaurantDto,
      {
        new: true,
      },
    );
  }

  async delete(userId: string, password: string, restaurantId: string) {
    if (await this.userService.confirmPassword(userId, password)) {
      return await this.restaurantModel.findByIdAndDelete(restaurantId);
    }
    throw new HttpException(
      {
        message: 'found some error',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
