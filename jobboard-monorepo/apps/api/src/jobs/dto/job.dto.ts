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
export enum sortEnum {
  asc = 'ASC',
  desc = 'DESC',
}
export enum categoryenum {
  'java' = 'java',
  'python' = 'python',
}
export enum locationenum {
  'hyderbad' = 'hyderbad',
  'bangalore' = 'bangalore',
}
