import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { WebSocketAuthMiddleware } from './events-auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT}`,
      signOptions: { expiresIn: '24hr' },
    }),
  ],
  providers: [EventsGateway, WebSocketAuthMiddleware],
  exports: [WebSocketAuthMiddleware, EventsGateway],
})
export class EventsModule {}
