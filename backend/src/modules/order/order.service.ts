import { Injectable } from '@nestjs/common';
import { ComponentService } from '../component/component.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { Component, Priority } from '../component/schema/component.schema';
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

    console.log(res);
    return res;
  }

  async checkCanMake(menuId: string, name: string, amount: number) {
    const components = await this.componentService.findByMenuId(menuId); //get all component of the menu
    let tempAmount = amount;
    let alert = [];

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
            alert.push({
              ingredient: ingredient.name,
              priority: Priority.HIGH,
              message: 'there is not enough left',
              at: cnt + 1,
            });
          } else if (component.priority == Priority.LOW) {
            status = Math.min(0, status);
            alert.push({
              ingredient: ingredient.name,
              priority: Priority.LOW,
              message: 'there is not enough left',
              at: cnt + 1,
            });
          }
        } else {
          const ingredientIndex = this.ingredients.findIndex(
            (ing) => ing.id === component.ingredientId,
          );

          this.ingredients[ingredientIndex].amount -=
            component.ingredientAmount;
        }
      });

      if (status >= 0) {
        tempAmount--;
        cnt++;

        await this.decreasedIngredient(components);
      } else {
        return { name: name, requied: amount, canCook: cnt, alert: alert };
      }
    }
    return { name: name, requied: amount, canCook: cnt, alert: alert };
  }

  async decreasedIngredient(components: Component[]) {
    for (const component of components) {
      const ingredient = await this.ingredientService.getById(
        component.ingredientId,
      );

      if (ingredient.amount >= component.ingredientAmount) {
        const newAmount = ingredient.amount - component.ingredientAmount;
        const newIngredient = ingredient;
        newIngredient.amount = Math.round(newAmount * 100) / 100;

        await this.ingredientService.update(ingredient.id, newIngredient);
      }
    }
  }
}
