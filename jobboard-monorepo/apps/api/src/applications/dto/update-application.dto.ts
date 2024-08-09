import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsArray, IsString, IsEnum } from 'class-validator';
import { statusEnum } from '../entities/application.entity';

export class UpdateApplicationDto {
  @IsUrl()
  @ApiProperty({
    description: 'resume url',
  })
  resume_url?: string;
  @IsEnum(statusEnum)
  @ApiProperty({
    description: 'status of application',
  })
  status?: statusEnum;
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'answers from job appliation',
  })
  answers?: string[];
}
