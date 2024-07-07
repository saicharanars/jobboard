import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'jobbboard_jobs' })
export class Job {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  job_role: string;
  @ApiProperty()
  @Column('varchar', { length: 1200 })
  description: string;
  @ApiProperty()
  @Column()
  openings: number;
  @ApiProperty()
  @Column()
  category: string;
  @ApiProperty()
  @Column()
  location: string;
  
  @ManyToOne(() => User, (user) => user.jobs)
  @JoinColumn({ name: 'userId' })
  user: User;
}
