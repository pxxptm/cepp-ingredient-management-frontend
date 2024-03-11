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

  private ingredients;

  async checkOrder(checkOrderDto: checkOrderDto[], id: string) {
    let res = [];
    this.ingredients = await this.ingredientService.getByRestaurantId(id);

    for (const order of checkOrderDto) {
      res.push(await this.checkCanMake(order.id, order.name, order.amount));
    }

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ4MmNmMWEzZTE2NGRhMDkyZTUxYzMiLCJ1c2VybmFtZSI6Im93bmVyIiwicm9sZSI6Im93bmVyIiwiaWF0IjoxNzEwMTYyNzcwLCJleHAiOjE3MTAyNDkxNzB9.abFnWRKFPombWRV16Ha3E5YkopKL2cOuaaqAeG0E-LA
    // 65d83ab124a06c65fb25cdcc
    // [{"id": "65dd54d26a056402059c1425", "name" : "tee pad ped", "amount" : 3}]

    console.log(res);
    return res;
  }

  async checkCanMake(menuId: string, name: string, amount: number) {
    const components = await this.componentService.findByMenuId(menuId); //get all component of the menu
    let tempAmount = amount;
    let cnt = 0;

    while (tempAmount) {
      let status = 1;
      const componentsPromise = components.map(async (component) => {
        const ingredient = this.ingredients.find(
          (ing) => ing.id === component.ingredientId, //temporary ingredient
        );

        if (ingredient.amount < component.ingredientAmount) {
          if (component.priority == Priority.HIGH) {
            status = Math.min(-1, status);
            return;
          } else if (component.priority == Priority.LOW) {
            status = Math.min(0, status);
            return;
          }
        } else {
          const ingredientIndex = this.ingredients.findIndex(
            (ing) => ing.id === component.ingredientId,
          );

          this.ingredients[ingredientIndex].amount -=
            component.ingredientAmount;
        }
      });

      if (status === 1) {
        tempAmount--;
        cnt++;
      } else {
        return { name: name, requied: amount, canCook: cnt };
      }
    }
    return { name: name, requied: amount, canCook: cnt };

    //   response = {
    //     ...response,
    //     ingredients: await Promise.all(componentsPromise),
    //   };
    //   return response;
  }
}
