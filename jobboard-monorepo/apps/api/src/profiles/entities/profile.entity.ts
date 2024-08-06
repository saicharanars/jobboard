import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'jobbboard_profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Column('varchar', { length: 5200 })
  description: string;
  @ApiProperty()
  @Column()
  date_of_birth: Date;
  @ApiProperty()
  @Column()
  resume_url: string;
  @ApiProperty()
  @Column()
  profile_picture_url: string;
  @ApiProperty()
  @Column()
  location: string;

  @ApiProperty()
  @Column('simple-json')
  sociallinks: { linkedin: string; github: string; website: string };

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
}
