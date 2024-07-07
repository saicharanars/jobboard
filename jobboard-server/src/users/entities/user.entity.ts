import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  JOB_CANDIDATE = 'job_candidate',
  JOB_EMPLOYER = 'job_employer',
}
@Entity({ name: 'jobboard_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  email: string;
  @ApiProperty()
  @Column({ type: 'bigint', nullable: true })
  mobile_number: number;
  @ApiProperty()
  @Column({
    nullable: true,
  })
  password: string;
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.JOB_CANDIDATE,
  })
  role: UserRole;
  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[];
}
