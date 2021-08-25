import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DiceCoreService } from '../dice-core/dice-core.service';
import { IMessage } from './packet-schema/message.type';
import { ESendOption } from "src/events/packet-schema/send-option-enum";
type SendOption = typeof ESendOption[keyof typeof ESendOption];

@WebSocketGateway({ cors: 'null,localhost' })
export class EventsGateway {
  @WebSocketServer()
  private server: Server;
  private clients = [];

  constructor(private diceCoreService: DiceCoreService) { }

  // handleConnection(@ConnectedSocket() client: any) {
  //   console.log(`${client.id} connected`);
  //   this.clients.push(client);
  // }
  //
  // handleDisconnect(@ConnectedSocket() client: any) {
  //   console.log(`${client.id} disconnected`);
  //   this.clients.splice(this.clients.indexOf(e => e.id === client.id), 1);
  // }

  @SubscribeMessage('events')
  events(@MessageBody() data: string): string {
    return data;
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: any, @MessageBody() packet: any): void {
    console.log(`incomming message: ${packet}`);
    const msg: IMessage = this.diceCoreService.HandleMessage(packet.data);
    if (msg.option === ESendOption.RESPONSE_TO_SENDER) {
      client.emit('message', JSON.stringify(msg.msg));
    }
  }
}