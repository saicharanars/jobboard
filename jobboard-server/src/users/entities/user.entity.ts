import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'job_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'bigint', nullable: true })
  mobile_number: number;

  @Column({
    nullable: true,
  })
  password: string;
}
