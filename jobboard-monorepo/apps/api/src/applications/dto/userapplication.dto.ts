import { User } from '../../users/entities/user.entity';
import { CreateJobDto } from '../../jobs/dto/create-job.dto';
import { Exclude } from 'class-transformer';

export class userApplicationsDto {
  resume_url: string;
  answers: string[];
  @Exclude()
  user: User;
  job: CreateJobDto;
}
