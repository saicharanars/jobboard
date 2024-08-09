/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { NextFunction } from 'express';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WebSocketAuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(socket: Socket, next: NextFunction) {
    const token = this.getTokenFromSocket(socket);
    console.log(token, '>>>>>>');
    if (!token) {
      throw new WsException('not authorized');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: `${process.env.JWT}`,
      });
      console.log(payload, 'user from auth event<<<<<<<');
      socket.data.user = payload;
      next();
    } catch (error) {
      console.log(error);
      return next(new Error('Unauthorized'));
    }
  }

  private getTokenFromSocket(socket: Socket): string | undefined {
    const token =
      socket.handshake.headers.authorization ||
      socket.handshake.query.authorization;
    console.log(token);
    return typeof token === 'string' ? token : undefined;
  }
}
