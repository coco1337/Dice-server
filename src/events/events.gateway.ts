import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
//import { Server } from 'socket.io';
import WebSocket, { Server } from 'ws';
import { DiceCoreService } from '../dice-core/dice-core.service';
import { IMessage } from './packet-schema/message.type';
import { IWebSocket } from './IWebSocket.type';
import { ESendOption } from "src/events/packet-schema/send-option-enum";
import { EPacketId } from './packet-schema/packet-id';
import { IRequestPacket } from './packet-schema/request-packet.type';
type SendOption = typeof ESendOption[keyof typeof ESendOption];
type PacketId = typeof EPacketId[keyof typeof EPacketId];

@WebSocketGateway(/*{ cors: 'null,localhost' }*/)
export class EventsGateway {
  @WebSocketServer()
  private server: Server;
  private clients: Array<IWebSocket> = [];

  constructor(private diceCoreService: DiceCoreService) { }

  handleConnection(@ConnectedSocket() client: IWebSocket) {
    client.id = `${this.clients.length}`;
    console.log(`${client.id} connected`);
    this.clients.push(client);
  }
  
  handleDisconnect(@ConnectedSocket() client: IWebSocket) {
    console.log(`${client} disconnected`);
    this.clients.splice(this.clients.indexOf(this.clients.filter((e: IWebSocket) => {e.id === client.id})[0]), 1);
  }

  @SubscribeMessage('events')
  onEvent(client: IWebSocket, data: any): string {
    return data;
  }

  @SubscribeMessage('DiceGame')
  diceEvent(client: IWebSocket, data: IRequestPacket): void {
    console.log(data);
    const res: IMessage = this.diceCoreService.HandleMessage(data);
    switch (res.option) {
      case ESendOption.BROADCAST_TO_ALL: {

      }
      case ESendOption.RESPONSE_TO_ROOM: {

      }
      case ESendOption.RESPONSE_TO_SENDER: {
        client.send(JSON.stringify({id: res.msg.id, msg: JSON.stringify(res.msg)}));
      }
    }
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: IWebSocket, @MessageBody() packet: any): void {
    console.log(`incomming message: ${packet}`);
    const msg: IMessage = this.diceCoreService.HandleMessage(packet.data);
    if (msg.option === ESendOption.RESPONSE_TO_SENDER) {
      // client.send('message', JSON.stringify(msg.msg));
    }
  }
}