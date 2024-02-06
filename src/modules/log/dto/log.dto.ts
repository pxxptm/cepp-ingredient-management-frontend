import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly restaurantId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly mennuId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredientId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredientAmount: number;
}

export class UpdateLogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly restaurantId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly mennuId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredientId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredientAmount: number;
}
