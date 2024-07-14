import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Job } from '../jobs/entities/job.entity';
import { Application } from '../applications/entities/application.entity';
import { Profile } from '../profiles/entities/profile.entity';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  entities: [User, Job, Application, Profile],
  migrations: ['build/migrations/*.js'],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
