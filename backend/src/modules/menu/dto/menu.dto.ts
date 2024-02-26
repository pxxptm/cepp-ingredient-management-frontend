import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly status: boolean;
}

export class UpdateMenuDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  readonly status?: boolean;
}
