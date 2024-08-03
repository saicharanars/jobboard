import { Job } from '../entities/job.entity';

export class JobsDto {
  job: Job[];
  totaljobs: number;
}
