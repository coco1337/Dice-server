import { ApiProperty } from '@nestjs/swagger';
import { EError } from './error-enum';
import { EPacketId } from './packet-id';
import { IResponsePacket } from './response-packet.type';
type PacketId = typeof EPacketId[keyof typeof EPacketId];

export class RollDiceRes implements IResponsePacket {
  @ApiProperty()
  id: PacketId;

  @ApiProperty()
  tick: number;

  @ApiProperty()
  result: EError;

  @ApiProperty()
  diceResult: number;
}