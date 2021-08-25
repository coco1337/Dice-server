import { Injectable } from '@nestjs/common';
import { EError } from 'src/events/packet-schema/error-enum';
import { EPacketId } from 'src/events/packet-schema/packet-id';
import { RollDiceReq } from 'src/events/packet-schema/roll-dice-req';
import { RollDiceRes } from 'src/events/packet-schema/roll-dice-res';

type PacketId = typeof EPacketId[keyof typeof EPacketId];

@Injectable()
export class DiceCoreService {
  private handlerMap = {};
  constructor(){
    this.handlerMap[EPacketId.ROLL_DICE_REQ] = this.RollDice;
  }

  HandleMessage(data: string): string{
    const d = JSON.parse(data);
    return this.handlerMap[d.id](d);
  }

  private RollDice(msg: any): string {
    const data: RollDiceReq = msg as RollDiceReq;
    console.log(data);
    const res: RollDiceRes = {
      id: EPacketId.ROLL_DICE_RES,
      tick: Date.now(),
      result: EError.SUCCESS,
    };

    return JSON.stringify(res);
  }
}
