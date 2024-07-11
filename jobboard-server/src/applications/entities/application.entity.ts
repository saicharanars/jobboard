import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { Job } from '../../jobs/entities/job.entity';

@Entity({ name: 'jobboard_applications' })
@Unique(['user', 'job'])
export class Application {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @IsUrl()
  @ApiProperty()
  resume_url: string;
  @Column('simple-array')
  @IsNotEmpty()
  answers: string[];
  @ManyToOne(() => User, (user) => user.Applications)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Job, (job) => job.applications)
  @JoinColumn({ name: 'jobId' })
  job: Job;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
}
