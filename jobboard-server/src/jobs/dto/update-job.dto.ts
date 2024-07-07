import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  @MinLength(5)
  @IsString()
  @ApiProperty()
  job_role: string;
  @IsOptional()
  @MinLength(30)
  @IsString()
  @ApiProperty()
  description: string;
  @IsOptional()
  @MinLength(3)
  @IsString()
  @ApiProperty()
  category: string;
  @IsOptional()
  @MinLength(5)
  @IsString()
  @ApiProperty()
  location: string;
  @IsOptional()
  @IsInt()
  @ApiProperty()
  openings: number;
}
