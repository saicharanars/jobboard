import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @ApiProperty()
  job_role: string;
  @IsNotEmpty()
  @MinLength(30)
  @IsString()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty()
  category: string;
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @ApiProperty()
  location: string;
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  openings: number;
  @IsNotEmpty()
  @ApiProperty()
  questions: string[];
}
