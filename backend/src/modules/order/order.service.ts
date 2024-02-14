import { Injectable } from '@nestjs/common';
import { ComponentService } from '../component/component.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Priority } from '../component/schema/component.schema';

@Injectable()
export class OrderService {
  constructor(
    private readonly componentService: ComponentService,
    private readonly ingredientService: IngredientService,
  ) {}

  async checkCanMake(menuId: string, amount: number) {
    const components = await this.componentService.findByMenuId(menuId);

    const componentsPromise = components.map(async (component) => {
      const ingredient = await this.ingredientService.getById(
        component.ingredientId,
      );
      const canMake = await this.ingredientService.checkCanMake(
        component.ingredientId,
        component.ingredientAmount * amount,
      );

      if (!canMake) {
        if (component.priority == Priority.HIGH) {
          return {
            name: ingredient.name,
            status: 'Out of Stock, can not make this menu',
          };
        } else if (component.priority == Priority.LOW) {
          return {
            name: ingredient.name,
            status: 'Out of Stock, but can make this menu',
          };
        }
      } else {
        return {
          name: ingredient.name,
          status: 'OK',
        };
      }
    });

    const response = await Promise.all(componentsPromise);
    return response;
  }
}
