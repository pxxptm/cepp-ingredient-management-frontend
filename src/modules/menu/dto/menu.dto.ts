import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly restaurantId: string;
}

export class UpdateMenuDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
}
