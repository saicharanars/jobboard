import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'resume url',
  })
  resume_url: string;
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'answers from job appliation',
  })
  answers: string[];
}
