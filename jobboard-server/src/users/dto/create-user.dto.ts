import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';



export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
  @IsInt()
  mobile_number: number;
}
