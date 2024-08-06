import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsISO8601,
  IsUrl,
  IsString,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(50)
  @ApiProperty()
  @ApiProperty({
    description: 'Description of the profile',
  })
  description: string;

  @IsISO8601()
  @ApiProperty()
  @ApiProperty({
    description: 'Date of birth',
  })
  date_of_birth: string;

  @IsUrl()
  @ApiProperty()
  @ApiProperty({
    description: 'resume link',
  })
  resume_url: string;

  @IsUrl()
  @ApiProperty()
  @ApiProperty({
    description: 'profile photo link',
  })
  profile_picture_url: string;

  @IsString()
  @ApiProperty()
  @ApiProperty({
    description: 'Location of the profile',
  })
  location: string;

  @IsOptional()
  sociallinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}
