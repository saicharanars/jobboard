import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  @MinLength(5)
  @IsString()
  @ApiProperty({
    description: 'job role',
  })
  job_role: string;
  @IsOptional()
  @MinLength(30)
  @IsString()
  @ApiProperty({
    description: 'job description',
  })
  description: string;
  @IsOptional()
  @MinLength(3)
  @IsString()
  @ApiProperty({
    description: 'category',
  })
  category: string;
  @IsOptional()
  @MinLength(5)
  @IsString()
  @ApiProperty({
    description: 'location',
  })
  location: string;
  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'no of job openings',
  })
  openings: number;
}
