import { IsString, IsDecimal } from 'class-validator';

export class WaypointDto {
  @IsDecimal()
  public longi: number;

  @IsDecimal()
  public lat: number;

  @IsString()
  public adress: string;
}
