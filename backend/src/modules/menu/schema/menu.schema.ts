import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Menu {
  @Prop()
  name: string;

  @Prop()
  restaurantId: string;

  @Prop()
  image: string;

  @Prop()
  status: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
