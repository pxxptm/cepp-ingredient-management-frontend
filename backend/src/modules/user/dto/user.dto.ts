import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../schema/user.schema';

export class UpdateUserByOwnerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly firstname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly lastname?: string;

  @ApiProperty({ required: false })
  @IsEnum(UserRole)
  @IsOptional()
  readonly role?: UserRole;
}

export class UpdateUserByUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly firstname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly lastname: string;

  readonly role: string;
}
