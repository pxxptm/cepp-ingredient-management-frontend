import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { OrderModule } from './order.module';
import { checkOrderDto } from './dto/order.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('restaurant/:id')
  async checkCanMake(
    @Param('id') id: string,
    @Body(new ParseArrayPipe({ items: checkOrderDto }))
    checkOrderDto: checkOrderDto[],
  ) {
    return await this.orderService.checkOrder(checkOrderDto, id);
  }
}
