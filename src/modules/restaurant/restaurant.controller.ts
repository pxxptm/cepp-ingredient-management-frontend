import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { AllRole } from '../user/schema/user.schema';
import { CurrentUser } from '../auth/decorator/currentuser.decorator';
import { IUser } from '../user/interface/user.interface';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @Roles(AllRole.OWNER)
  async create(
    @CurrentUser() iuser: IUser,
    @Body() createrestaurantdto: CreateRestaurantDto,
  ) {
    return await this.restaurantService.create(iuser.sub, createrestaurantdto);
  }

  @Patch(':id')
  @Roles(AllRole.OWNER)
  async update(
    @Param('id') id: string,
    @Body() updaterestaurantdto: UpdateRestaurantDto,
  ) {
    return await this.restaurantService.update(id, updaterestaurantdto);
  }

  @Delete(':id')
  @Roles(AllRole.OWNER)
  async delete(@Param('id') id: string) {
    return await this.restaurantService.delete(id);
  }
}
