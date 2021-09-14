import { EError } from '../packet-schema/error-enum';
import { EPacketId } from './packet-id';
type PacketId = typeof EPacketId[keyof typeof EPacketId];

export interface IResponsePacket {
  id: PacketId;
  tick: number;
  result: EError;
}

export interface ICreateRoomRes extends IResponsePacket {
  roomId: string;
}

export interface IPlayerJoinNoti extends IResponsePacket {
  playerGuid: string;
}

export interface IStartGameNoti extends IResponsePacket {
  
}