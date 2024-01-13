import { IsInt, IsString } from 'class-validator';
export class NavigationDto {
  @IsInt()
  public ItineraryId: number;

  @IsString()
  public sessionId: string;
}
