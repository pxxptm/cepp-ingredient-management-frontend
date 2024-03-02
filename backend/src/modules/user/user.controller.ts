import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { AllRole } from './schema/user.schema';
import { appConfig } from 'config/app.config';
import { CurrentUser } from '../auth/decorator/currentuser.decorator';
import { IUser } from './interface/user.interface';
import { UpdateUserByOwnerDto, UpdateUserByUserDto } from './dto/user.dto';

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

  @Get('/user-id-by-username/:username')
  @UseGuards(AuthGuard)
  async getUserIdByUsername(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }

  @Get('/user-info')
  @UseGuards(AuthGuard)
  async getUserInfo(@CurrentUser() iuser: IUser) {
    return await this.userService.getByIdReturnValidData(iuser.sub);
  }

  @Get('role')
  @UseGuards(AuthGuard)
  async getUserRole(@CurrentUser() iuser: IUser) {
    return await this.userService.getUserRole(iuser.sub);
  }

  @Patch('/updated-by-owner/:id')
  @Roles(AllRole.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  async updateUserByOwner(
    @Param('id') id: string,
    @Body() updateUserByOwnerDto: UpdateUserByOwnerDto,
  ) {
    return await this.userService.updateUserByOwner(id, updateUserByOwnerDto);
  }

  @Patch('/updated-by-user/:id')
  @UseGuards(AuthGuard)
  async updateUserByUser(
    @Param('id') id: string,
    @Body() updateUserByUserDto: UpdateUserByUserDto,
  ) {
    return await this.userService.updateUserByUser(id, updateUserByUserDto);
  }

  @Delete('/delete-by-owner/:id')
  @Roles(AllRole.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteUserByOwner(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
