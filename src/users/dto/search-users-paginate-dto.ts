import { ApiProperty } from '@nestjs/swagger';

export class SearchUsersPaginateDto {

  @ApiProperty()
  username?: string;
  // email?: string;
  // startDate?: Date;
  // endDate?: Date;

  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;
}