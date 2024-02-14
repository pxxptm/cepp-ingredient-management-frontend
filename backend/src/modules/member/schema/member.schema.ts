import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Member {
  @Prop()
  userId: string;

  @Prop()
  restaurantId: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
