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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.menuService.findOneById(id);
  }

  @Get('get-all-menu/:restaurantId')
  async findByRestaurantId(@Param('restaurantId') id: string) {
    return await this.menuService.findAllByRestaurantId(id);
  }

  @Get('get-valid-menu/:restaurantId')
  async findValidByRestaurantId(@Param('restaurantId') id: string) {
    return await this.menuService.findValidByRestaurantId(id);
  }

  @Post()
  async create(@Body() createMenudto: CreateMenuDto) {
    return await this.menuService.create(createMenudto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenudto: UpdateMenuDto) {
    return await this.menuService.update(id, updateMenudto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.menuService.delete(id);
  }
}
