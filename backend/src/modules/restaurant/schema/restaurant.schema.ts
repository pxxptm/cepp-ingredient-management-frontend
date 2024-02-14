import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
