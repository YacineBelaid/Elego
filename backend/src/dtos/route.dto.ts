import {
  IsInt,
  IsDecimal,
  IsMilitaryTime,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class RouteDto {
  @IsLatitude()
  public departureLat: number;

  @IsLongitude()
  public departureLong: number;

  @IsLongitude()
  public arrivalLong: number;

  @IsLatitude()
  public arrivalLat: number;

  @IsMilitaryTime()
  public etaDeparture: Date | string | null;
  // MilitaryTime format string ou date de type  00:00

  @IsMilitaryTime()
  public etaArrival: Date | string | null;

  @IsDecimal()
  public length: number | null;

  @IsDecimal()
  public cost: number | null;

  @IsInt()
  public chargingTime: number;

  @IsInt()
  public dwellingTime: number;
}
