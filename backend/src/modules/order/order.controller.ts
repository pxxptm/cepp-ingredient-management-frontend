import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async checkCanMake(
    @Query('menuId') menuId: string,
    @Query('amount') amount: number,
  ) {
    return await this.orderService.checkCanMake(menuId, amount);
  }
}
