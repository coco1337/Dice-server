import { ApiProperty } from '@nestjs/swagger';

export class ChangeTurnNoti {
  @ApiProperty()
  result: number;
  turn: number;
}