import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  restaurantId: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
