import { Exclude } from 'class-transformer';
export class UserDto {
  id: number;
  name: string;
  email: string;
  @Exclude()
  password: string;
  mobile_number: number;
  role: string;
}
