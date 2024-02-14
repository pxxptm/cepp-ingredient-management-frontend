import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ComponentModule } from '../component/component.module';
import { IngredientModule } from '../ingredient/ingredient.module';

@Module({
  imports: [ComponentModule, IngredientModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
