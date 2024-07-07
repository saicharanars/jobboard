import { Exclude } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

export class JobDto {
  id: string;
  name: string;

  job_role: string;

  description: string;

  category: string;

  location: string;

  openings: number;
  @Exclude()
  user: UserDto;
}
