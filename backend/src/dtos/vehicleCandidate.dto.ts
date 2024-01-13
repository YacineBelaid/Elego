import { IsString, IsInt } from 'class-validator';
export class VehicleCandidateDto {
  @IsInt()
  public vehicleId: number;

  @IsString()
  public sessionId: string;

  @IsInt()
  public autonomyRank: number;

  @IsInt()
  public priceRank: number;
}
