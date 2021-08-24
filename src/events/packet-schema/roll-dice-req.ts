import { ApiProperty } from '@nestjs/swagger';
import { IRequestPacket } from './request-packet.type';
import { EPacketId } from '../packet-schema/packet-id';
type PacketId = typeof EPacketId[keyof typeof EPacketId];

export class RollDiceReq implements IRequestPacket {
  @ApiProperty()
  id: PacketId;

  @ApiProperty()
  sender: string;
}