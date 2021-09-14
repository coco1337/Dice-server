import { EPacketId } from '../packet-schema/packet-id';
type PacketId = typeof EPacketId[keyof typeof EPacketId];

export interface IRequestPacket {
  id: PacketId;
  sender: string;
}

export interface ICreateRoomReq extends IRequestPacket {
  
}