import { ESendOption } from "./send-option-enum";
import { IResponsePacket } from "./response-packet.type";
type SendOption = typeof ESendOption[keyof typeof ESendOption];

export interface IMessage {
  option: SendOption;
  msg: IResponsePacket;
}