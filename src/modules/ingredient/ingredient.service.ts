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
