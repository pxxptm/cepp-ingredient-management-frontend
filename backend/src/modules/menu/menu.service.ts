import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './schema/menu.schema';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { ComponentService } from '../component/component.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Priority } from '../component/schema/component.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name)
    private readonly menuModel: mongoose.Model<Menu>,
    private readonly componentService: ComponentService,
    private readonly ingredientService: IngredientService,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const createdMenu = new this.menuModel(createMenuDto);
    await createdMenu.save();
  }

  async findOneById(menuId: string) {
    return await this.menuModel.findById(menuId);
  }

  async findAllByRestaurantId(restaurantId: string) {
    return await this.menuModel.find({ restaurantId: restaurantId });
  }

  async findValidByRestaurantId(restaurantId: string) {
    const menus = await this.menuModel.find({
      restaurantId: restaurantId,
      status: true,
    });

    const updatedMenus = [];

    for (const menu of menus) {
      let canCook = 1;

      const components = await this.componentService.findByMenuId(
        menu._id.toString(),
      );

      for (const component of components) {
        const ingredient = await this.ingredientService.getById(
          component.ingredientId,
        );

        if (ingredient.amount < component.ingredientAmount) {
          if (component.priority == Priority.HIGH)
            canCook = Math.min(canCook, -1);
          else if (component.priority == Priority.LOW)
            canCook = Math.min(canCook, 0);
        }
      }

      const updatedMenu = { ...menu.toObject(), canCook: canCook };
      updatedMenus.push(updatedMenu);
    }

    return updatedMenus;
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
