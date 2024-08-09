import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Application } from '../applications/entities/application.entity';
import { WebSocketAuthMiddleware } from './events-auth.middleware';
import { UpdateEventDto } from './dto/update-event.dto';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  userClients: Map<string, Socket> = new Map();

  constructor(private webSocketAuthMiddleware: WebSocketAuthMiddleware) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    // Apply WebSocketAuthMiddleware manually
    await new Promise<void>((resolve, reject) => {
      this.webSocketAuthMiddleware.use(client, (err) => {
        if (err) {
          client.disconnect();
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const { id, username, role } = client.data.user;
    console.log(id, username, 'from handle connection');
    this.userClients.set(id, client);
    console.log(`User ${id} (${username}, ${role} , client ) connected`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    for (const [userId, socket] of this.userClients.entries()) {
      if (socket === client) {
        this.userClients.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  }

  emitApplicationCreated(application: Application, userId: string) {
    const client = this.userClients.get(userId);
    if (client) {
      client.emit('application:created', application);
    }
  }

  emitApplicationUpdated(updatevent: UpdateEventDto) {
    const client = this.userClients.get(updatevent.clientid);
    const { message, name } = updatevent;
    const data = { message, name };
    if (client) {
      client.emit('application:updated', data);
    }
  }
}
