import { PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
export enum fileType {
  PHOTO = 'profile_picture_url',
  PDF = 'resume_url',
}
export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
export class uploadType {
  @IsNotEmpty()
  @IsEnum(fileType)
  type: fileType;
}
