import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { UpdateUserByOwnerDto, UpdateUserByUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) {}

  async getAll() {
    return await this.userModel.find();
  }

  async getUserRole(id: string) {
    const user = await this.userModel.findById(id);
    return {
      role: user.role,
    };
  }

  async getByIdReturnValidData(id: string) {
    const user = await this.userModel.findById(id);
    return {
      userId: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username });
    return user.id;
  }

  async updateUserByUser(id: string, updateUserByUserDto: UpdateUserByUserDto) {
    const user = await this.getUserByUsername(updateUserByUserDto.username);

    if (id != user) {
      throw new HttpException(
        {
          message: 'this user do not have permission to access',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (updateUserByUserDto.role != null) {
      throw new HttpException(
        {
          message: 'this user do not have permission to access role',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user || id == user) {
      return await this.userModel.findByIdAndUpdate(id, updateUserByUserDto, {
        new: true,
      });
    } else {
      throw new HttpException(
        {
          message: 'this username is already used',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUserByOwner(
    id: string,
    updateUserByOwnerDto: UpdateUserByOwnerDto,
  ) {
    const user = await this.getUserByUsername(updateUserByOwnerDto.username);
    if (!user || id == user) {
      return await this.userModel.findByIdAndUpdate(id, updateUserByOwnerDto, {
        new: true,
      });
    } else {
      throw new HttpException(
        {
          message: 'this username is already used',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async confirmPassword(id: string, password: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException(
        {
          message: 'user not found',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return true;
    } else {
      throw new HttpException(
        {
          message: 'user or password incorrect.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
