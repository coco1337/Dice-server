import { Injectable } from '@nestjs/common';
import { EPacketId } from 'src/events/packet-schema/packet-id';
import { RollDiceReq } from 'src/events/packet-schema/roll-dice-req';

type PacketId = typeof EPacketId[keyof typeof EPacketId];

@Injectable()
export class DiceCoreService {
  private handlerMap = {};
  constructor(){
    this.handlerMap[EPacketId.ROLL_DICE_REQ] = this.RollDice;
  }

  HandleMessage(data: string): void{
    const d = JSON.parse(data);
    this.handlerMap[d.id](d);
  }

  private RollDice(msg: any) {
    const data: RollDiceReq = msg as RollDiceReq;
    console.log(data);
  }
}
