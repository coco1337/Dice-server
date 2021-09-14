import { Injectable } from '@nestjs/common';
import { EError } from 'src/events/packet-schema/error-enum';
import { IMessage } from 'src/events/packet-schema/message.type';
import { ICreateRoomReq, IRequestPacket } from 'src/events/packet-schema/request-packet.type';
import { EPacketId } from 'src/events/packet-schema/packet-id';
import { ESendOption } from "src/events/packet-schema/send-option-enum";
import { RollDiceReq } from 'src/events/packet-schema/roll-dice-req';
import { RollDiceRes } from 'src/events/packet-schema/roll-dice-res';
import { DiceRoom } from './dice-room';
import { IWebSocket } from 'src/events/IWebSocket.type';
import { ICreateRoomRes } from 'src/events/packet-schema/response-packet.type';

type PacketId = typeof EPacketId[keyof typeof EPacketId];
type SendOption = typeof ESendOption[keyof typeof ESendOption];

@Injectable()
export class DiceCoreService {
  private handlerMap: Map<PacketId, Function>;
  private diceCount: number;
  private diceMaxNumber: number;
  private diceGameRoomMap: Map<string/**RoomId */, DiceRoom>;

  constructor(){
    this.diceGameRoomMap = new Map<string, DiceRoom>();
    this.handlerMap = new Map<PacketId, Function>();
    this.diceCount = 1;
    this.diceMaxNumber = 6;

    this.handlerMap[EPacketId.ROLL_DICE_REQ] = this.RollDice;
    this.handlerMap[EPacketId.CREATE_ROOM_REQ] = this.CreateRoom;
  }

  public HandleMessage(data: IRequestPacket, client: IWebSocket): IMessage {
    return this.handlerMap[data.id](data, client);
  }

  private CreateRoom(msg: ICreateRoomReq, client: IWebSocket): IMessage {
    console.log(msg);

    let roomId: string = '';
    while (true) {
      roomId = this.MakeRandomId(10);
      if (!this.diceGameRoomMap.has(roomId)) break;
    }

    const room = new DiceRoom(roomId);
    this.diceGameRoomMap.set(roomId, room);

    room.TryJoin(client);
    client.room = roomId;

    const res: ICreateRoomRes = {
      id: EPacketId.CREATE_ROOM_RES,
      tick: Date.now(),
      result: EError.SUCCESS,
      roomId: roomId,
    }

    return {
      option: ESendOption.RESPONSE_TO_SENDER,
      msg: res,
    }
  }

  private RollDice(msg: RollDiceReq, client: IWebSocket): IMessage {
    const data: RollDiceReq = msg as RollDiceReq;
    console.log(data);

    const res: RollDiceRes = {
      id: EPacketId.ROLL_DICE_RES,
      tick: Date.now(),
      result: EError.SUCCESS,
      diceResult: Math.floor((Math.random() * 5) + 1)
    };

    const message: IMessage = {
      option: ESendOption.RESPONSE_TO_SENDER,
      msg: res
    }

    return message;
  }

  private MakeRandomId(len: number): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
