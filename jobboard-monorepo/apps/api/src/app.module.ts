import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MediaModule } from './media/media.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    JobsModule,
    ApplicationsModule,
    ProfilesModule,
    MediaModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
