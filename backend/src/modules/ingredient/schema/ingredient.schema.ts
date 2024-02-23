import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  atLeast: number;

  @Prop()
  unit: string;

  @Prop()
  restaurantId: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
