import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Priority {
  HIGH = 'high',
  LOW = 'low',
}

@Schema()
export class Component {
  @Prop()
  restaurantId: string;

  @Prop()
  menuId: string;

  @Prop()
  ingredientId: string;

  @Prop()
  ingredientAmount: number;

  @Prop({
    enum: Priority,
    default: 'low',
  })
  priority: Priority;
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
