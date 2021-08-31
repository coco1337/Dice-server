import { Injectable } from '@nestjs/common';
import { EError } from 'src/events/packet-schema/error-enum';
import { IMessage } from 'src/events/packet-schema/message.type';
import { IRequestPacket } from 'src/events/packet-schema/request-packet.type';
import { EPacketId } from 'src/events/packet-schema/packet-id';
import { ESendOption } from "src/events/packet-schema/send-option-enum";
import { RollDiceReq } from 'src/events/packet-schema/roll-dice-req';
import { RollDiceRes } from 'src/events/packet-schema/roll-dice-res';

type PacketId = typeof EPacketId[keyof typeof EPacketId];
type SendOption = typeof ESendOption[keyof typeof ESendOption];

@Injectable()
export class DiceCoreService {
  private handlerMap = {};
  private diceCount: number = 1;
  private diceMaxNumber: number = 6;
  constructor(){
    this.handlerMap[EPacketId.ROLL_DICE_REQ] = this.RollDice;
  }

  HandleMessage(data: IRequestPacket): IMessage {
    return this.handlerMap[data.id](data);
  }

  private RollDice(msg: any): IMessage {
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
}
