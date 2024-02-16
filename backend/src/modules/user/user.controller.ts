import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { AllRole } from './schema/user.schema';
import { appConfig } from 'config/app.config';
import { CurrentUser } from '../auth/decorator/currentuser.decorator';
import { IUser } from './interface/user.interface';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(AllRole.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  async getAll() {
    if (appConfig().version == 'TEST') {
      return await this.userService.getAll();
    }
  }

  @Get('role')
  @UseGuards(AuthGuard)
  async getUserRole(@CurrentUser() iuser: IUser) {
    return await this.userService.getUserRole(iuser.sub);
  }
}
