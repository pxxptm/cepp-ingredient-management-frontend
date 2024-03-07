import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient } from './schema/ingredient.schema';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: mongoose.Model<Ingredient>,
  ) {}

  async getById(ingredientId: string) {
    return await this.ingredientModel.findById(ingredientId);
  }

  async getByRestaurantId(restaurantId: string) {
    return await this.ingredientModel.find({ restaurantId: restaurantId });
  }

  async getCheckingIngredient(restaurantId: string) {
    const ingredients = await this.getByRestaurantId(restaurantId);
    const result = ingredients.filter((ing) => ing.atLeast >= ing.amount);

    if (result.length == 0) return 'there are still a lot of ingredients left';
    else return result;
  }

  async getWithSortByRestaurantId(restaurantId: string) {
    const sortedResults = await this.ingredientModel
      .aggregate([
        {
          $match: { restaurantId: restaurantId },
        },
        {
          $addFields: {
            ratio: {
              $cond: {
                if: { $eq: ['$atLeast', 0] },
                then: Number.POSITIVE_INFINITY,
                else: { $divide: ['$amount', '$atLeast'] },
              },
            },
          },
        },
        {
          $sort: { ratio: -1 },
        },
      ])
      .exec();

    return sortedResults;
  }

  async create(createIngredientDto: CreateIngredientDto) {
    const createdIngredient = new this.ingredientModel(createIngredientDto);
    await createdIngredient.save();
    return createdIngredient;
  }

  async update(ingredientId: string, updateIngredientDto: UpdateIngredientDto) {
    return await this.ingredientModel.findByIdAndUpdate(
      ingredientId,
      updateIngredientDto,
      {
        new: true,
      },
    );
  }

  async delete(ingredientId: string) {
    return await this.ingredientModel.findByIdAndDelete(ingredientId);
  }

  async checkCanMake(ingredientId: string, amount: number) {
    const ingredient = await this.ingredientModel.findById(ingredientId);
    return ingredient.amount >= amount;
  }
}
