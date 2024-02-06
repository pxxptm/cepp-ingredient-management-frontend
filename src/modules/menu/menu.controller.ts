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

  @Get('restaurant/:id')
  async findByRestaurantId(@Param('id') id: string) {
    return await this.menuService.findByRestaurantId(id);
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
