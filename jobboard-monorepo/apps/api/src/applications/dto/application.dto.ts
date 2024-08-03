import { User } from '../../users/entities/user.entity';
import { CreateJobDto } from '../../jobs/dto/create-job.dto';
import { Exclude } from 'class-transformer';

export class ApplicationDto {
  resume_url: string;
  answers: string[];
  @Exclude()
  user: User;
  @Exclude()
  job: CreateJobDto;
}
