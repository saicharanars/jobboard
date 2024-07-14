import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @ApiProperty({
    description: 'name',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'email of user',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({
    description: 'user password',
  })
  password: string;
  @IsInt()
  @ApiProperty({
    description: 'mobile number',
  })
  mobile_number: number;
  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty({
    description: 'role job seeeker or job employer',
  })
  role: UserRole;
}
