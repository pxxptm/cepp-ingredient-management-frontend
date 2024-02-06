import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) {}

  async getAll() {
    return await this.userModel.find();
  }

  async getByIdReturnValidData(id: string) {
    const user = await this.userModel.findById(id);
    return {
      userId: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    };
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username });
    return user.id;
  }
}
