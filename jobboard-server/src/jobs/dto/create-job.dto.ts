import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @ApiProperty({
    description: 'This is the job role of a job',
  })
  job_role: string;
  @IsNotEmpty()
  @MinLength(30)
  @IsString()
  @ApiProperty()
  @ApiProperty({
    description: 'This is the description of a job',
  })
  description: string;
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty({
    description: 'job category',
  })
  category: string;
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @ApiProperty({
    description: 'Location of the job',
  })
  location: string;
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'no of job openings',
  })
  openings: number;
  @IsNotEmpty()
  @ApiProperty({
    description: 'questions to ask from the job seeker',
  })
  questions: string[];
}
