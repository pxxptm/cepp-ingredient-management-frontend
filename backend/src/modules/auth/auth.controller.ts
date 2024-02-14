import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterOwnerDto, RegisterUserDto } from './dto/auth-register.dto';
import { LoginUserDto } from './dto/auth-login.dto';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './decorator/role.decorator';
import { AllRole } from '../user/schema/user.schema';
import { CurrentUser } from './decorator/currentuser.decorator';
import { IUser } from '../user/interface/user.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register/:restaurantId')
  @Roles(AllRole.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  async registerUser(
    @Param('restaurantId') restaurantId: string,
    @Body() registerUserDto: RegisterUserDto,
  ) {
    return await this.authService.registerUser(restaurantId, registerUserDto);
  }

  @Post('register-owner')
  async registerOwner(@Body() registerOwnerDto: RegisterOwnerDto) {
    return await this.authService.registerOwner(registerOwnerDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.LoginUser(loginUserDto);
  }
}
