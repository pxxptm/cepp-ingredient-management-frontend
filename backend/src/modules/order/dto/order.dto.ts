import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class checkOrderDto {
  @ApiProperty()
  @IsString()
  menuId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
