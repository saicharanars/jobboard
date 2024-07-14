import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email of user',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({
    description: 'password',
  })
  password: string;
}
