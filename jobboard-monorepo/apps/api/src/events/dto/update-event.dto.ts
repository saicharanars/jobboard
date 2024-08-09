import { IsString, IsUUID } from 'class-validator';
export class UpdateEventDto {
  @IsUUID()
  @IsString()
  clientid: string;
  message: string;
  name: string;
}
