import { Injectable } from '@nestjs/common';
import { ComponentService } from '../component/component.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Priority } from '../component/schema/component.schema';
import { checkOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly componentService: ComponentService,
    private readonly ingredientService: IngredientService,
  ) {}

  private IngredientTemp;

  async checkOrder(checkOrderDto: checkOrderDto[], id: string) {
    this.IngredientTemp = await this.ingredientService.getByRestaurantId(id);

    let res = [];

    for (const order of checkOrderDto) {
      res.push(await this.checkCanMake(order.menuId, order.amount));
    }

    // console.log(res);
    // return res;
  }

  async checkCanMake(menuId: string, amount: number) {
    const components = await this.componentService.findByMenuId(menuId);

    console.log('Ingredient');
    console.log(this.IngredientTemp);

    const componentsPromise = components.map(async (component) => {
      let ingredient = [];

      for (const e of this.IngredientTemp) {
        console.log('E');
        console.log(e._id);
      }

      console.log(ingredient);

      // const ingredient = await this.ingredientService.getById(
      //   component.ingredientId,
      // );

      // const canMake = await this.ingredientService.checkCanMake(
      //   component.ingredientId,
      //   component.ingredientAmount * amount,
      // );

      //     if (!canMake) {
      //       if (component.priority == Priority.HIGH) {
      //         status = Math.min(status, -1);
      //         return {
      //           ingredientName: ingredient.name,
      //           priority: Priority.HIGH,
      //           currentAmount: ingredient.amount,
      //           requiredAmount: component.ingredientAmount * amount,
      //           maxCanMake: Math.floor(
      //             ingredient.amount / (component.ingredientAmount * amount),
      //           ),
      //           status: 'Out of Stock, can not make this menu',
      //         };
      //       } else if (component.priority == Priority.LOW) {
      //         status = Math.min(status, 0);
      //         return {
      //           ingredientName: ingredient.name,
      //           status: 'Out of Stock, but can make this menu',
      //         };
      //       }
      //     } else {
      //       return {
      //         ingredientName: ingredient.name,
      //         status: 'OK',
      //       };
      //     }
    });

    //   response = {
    //     ...response,
    //     ingredients: await Promise.all(componentsPromise),
    //   };
    //   return response;
  }
}
