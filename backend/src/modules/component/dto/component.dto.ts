import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly restaurantId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly menuId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly ingredientId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly ingredientAmount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Priority)
  readonly priority: Priority;
}
