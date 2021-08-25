import { Injectable } from '@nestjs/common';
import { EError } from 'src/events/packet-schema/error-enum';
import { IMessage } from 'src/events/packet-schema/message.type';
import { EPacketId } from 'src/events/packet-schema/packet-id';
import { ESendOption } from "src/events/packet-schema/send-option-enum";
import { RollDiceReq } from 'src/events/packet-schema/roll-dice-req';
import { RollDiceRes } from 'src/events/packet-schema/roll-dice-res';

type PacketId = typeof EPacketId[keyof typeof EPacketId];
type SendOption = typeof ESendOption[keyof typeof ESendOption];

@Injectable()
export class DiceCoreService {
  private handlerMap = {};
  constructor(){
    this.handlerMap[EPacketId.ROLL_DICE_REQ] = this.RollDice;
  }

  HandleMessage(data: string): IMessage {
    const d = JSON.parse(data);
    return this.handlerMap[d.id](d);
  }

  private RollDice(msg: any): IMessage {
    const data: RollDiceReq = msg as RollDiceReq;
    console.log(data);

    const res: RollDiceRes = {
      id: EPacketId.ROLL_DICE_RES,
      tick: Date.now(),
      result: EError.SUCCESS,
    };

    const message: IMessage = {
      option: ESendOption.RESPONSE_TO_SENDER,
      msg: res
    }

    return message;
  }
}
