import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Priority } from '../schema/component.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComponentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly restaurantId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly menuId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredientId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredientAmount: number;

  @IsEnum(Priority)
  @ApiProperty()
  readonly priority: Priority;
}

export class UpdateComponentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly restaurantId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly menuId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredientId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredientAmount: number;

  @IsEnum(Priority)
  @ApiProperty()
  readonly priority: Priority;
}
