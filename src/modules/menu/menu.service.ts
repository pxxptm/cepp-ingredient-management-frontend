import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './schema/menu.schema';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name)
    private readonly menuModel: mongoose.Model<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const createdMenu = new this.menuModel(createMenuDto);
    await createdMenu.save();
  }

  async findOneById(menuId: string) {
    return await this.menuModel.findById(menuId);
  }

  async findByRestaurantId(restaurantId: string) {
    return await this.menuModel.find({ restaurantId: restaurantId });
  }

  async update(menuId: string, updateMenuDto: UpdateMenuDto) {
    return await this.menuModel.findByIdAndUpdate(menuId, updateMenuDto, {
      new: true,
    });
  }

  async delete(menuId: string) {
    return await this.menuModel.findByIdAndDelete(menuId);
  }
}
