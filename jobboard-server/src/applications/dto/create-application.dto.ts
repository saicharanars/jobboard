import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsUrl()
  resume_url: string;
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  answers: string[];
}
