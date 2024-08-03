import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MinLength(50)
  @ApiProperty()
  @ApiProperty({
    description: 'Description of the profile',
  })
  description: string;
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  @ApiProperty({
    description: 'Date of birth',
  })
  date_of_birth: Date;
  @ApiProperty()
  @ApiProperty({
    description: 'url of resume',
  })
  @IsUrl()
  resume_url: string;
  @IsOptional()
  @IsUrl()
  @ApiProperty()
  @ApiProperty({
    description: 'url of profile picture',
  })
  profile_picture_url: string;
  @IsString()
  @ApiProperty()
  @ApiProperty({
    description: 'Location of the profile',
  })
  location: string;
  @IsObject()
  @IsOptional()
  @ApiProperty()
  @ApiProperty({
    description: 'social media links',
  })
  sociallinks: { linkedin: string; github: string; website: string };
}
