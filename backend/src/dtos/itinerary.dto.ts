import { IsInt, IsEnum } from 'class-validator';
import { Itinerary_day, Itinerary_period } from 'prisma/prisma-client/index';

export class ItineraryDto {
  @IsInt()
  public id: number;

  @IsEnum(Itinerary_day)
  public dayE: Itinerary_day | null;

  @IsEnum(Itinerary_period)
  public period: Itinerary_period | null;

  @IsInt()
  public frequency: number | null;
}
