import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AllRole, User } from '../user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterOwnerDto, RegisterUserDto } from './dto/auth-register.dto';
import { authConfig } from 'config/auth.config';
import { LoginUserDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MemberService } from '../member/member.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly userService: UserService,
    private readonly memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async registerOwner(registerOwnerDto: RegisterOwnerDto) {
    if (registerOwnerDto.ownerSecret != authConfig().ownerSecret) {
      throw new HttpException(
        {
          message: 'can not access owner role.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.register({
        username: registerOwnerDto.username,
        password: registerOwnerDto.password,
        name: registerOwnerDto.name,
        role: AllRole.OWNER,
      });
    }
  }

  async registerUser(restaurantId: string, registerUserDto: RegisterUserDto) {
    await this.register(registerUserDto);

    const user = await this.userService.getUserByUsername(
      registerUserDto.username,
    );
    if (!user) {
      throw new HttpException(
        {
          message: 'username not  found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.memberService.create(user, restaurantId);
  }

  private async register({ username, password, name, role }) {
    const user = await this.userModel.findOne({
      username: username,
    });

    try {
      if (!user) {
        const saltOrRounds = +authConfig().saltround;
        const hash = await bcrypt.hash(password, saltOrRounds);

        (password as string) = hash;
        const registedUser = new this.userModel({
          username: username,
          password: password,
          name: name,
          role: role,
        });
        await registedUser.save();

        return await this.generateAccessToken(
          registedUser.id,
          registedUser.username,
          registedUser.role,
        );
      } else {
        throw new HttpException(
          {
            message: 'username already exists.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        error.status,
      );
    }
  }

  async LoginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      username: loginUserDto.username,
    });

    if (!user) {
      throw new HttpException(
        {
          message: 'user or password incorrect.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (isMatch) {
      return {
        accessToken: await this.generateAccessToken(
          user.id,
          user.username,
          user.role,
        ),
      };
    } else {
      throw new HttpException(
        {
          message: 'user or password incorrect.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async generateAccessToken(
    userId: string,
    username: string,
    role: string,
  ) {
    const payload = { sub: userId, username: username, role: role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
