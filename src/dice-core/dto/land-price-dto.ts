import { ApiProperty } from "@nestjs/swagger";

export class LandPriceDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  land: number;

  @ApiProperty()
  building: number;

  @ApiProperty()
  villa: number;

  @ApiProperty()
  hotel: number;
}