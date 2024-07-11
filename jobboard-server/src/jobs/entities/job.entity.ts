import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Application } from '../../applications/entities/application.entity';

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

  @ApiProperty()
  @IsNotEmpty()
  @Column('simple-array')
  questions: string[];

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
}
