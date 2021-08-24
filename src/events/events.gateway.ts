import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DiceCoreService } from 'src/dice-core/dice-core.service';

@WebSocketGateway({ cors: 'null,localhost', transports: 'websocket' })
export class EventsGateway {
  @WebSocketServer()
  private server: Server;
  private clients = [];
  private diceCore = new DiceCoreService();

  handleConnection(@ConnectedSocket() client: any) {
    console.log(`${client.id} connected`);
    this.clients.push(client);
  }

  handleDisconnect(@ConnectedSocket() client: any) {
    console.log(`${client.id} disconnected`);
    this.clients.splice(this.clients.indexOf(e => e.id === client.id), 1);  
  }

  @SubscribeMessage('events')
  events(@MessageBody() data: string): string {
    return data;
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: any, @MessageBody() packet: any): void {
    console.log(`incomming message: ${packet}`);
    this.diceCore.HandleMessage(packet.data);
  }
}