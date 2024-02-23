import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly unit: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly restaurantId: string;
}

export class UpdateIngredientDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly unit?: string;
}
