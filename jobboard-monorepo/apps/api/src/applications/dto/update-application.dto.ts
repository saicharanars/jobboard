import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsArray, IsString, IsEnum, IsOptional } from 'class-validator';
import { statusEnum } from '../entities/application.entity';

export class UpdateApplicationDto {
  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'resume url',
  })
  resume_url?: string;
  @IsOptional()
  @IsEnum(statusEnum)
  @ApiProperty({
    description: 'status of application',
  })
  status?: statusEnum;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'answers from job appliation',
  })
  answers?: string[];
}
