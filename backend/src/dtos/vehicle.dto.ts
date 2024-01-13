import { Vehicle_category, Vehicle_type } from '@prisma/client';
import { IsString, IsInt, IsEnum, IsDate } from 'class-validator';

export class VehicleDto {
  @IsInt()
  public vehicleId: number;

  @IsString()
  public brand: string;

  @IsInt()
  public year: number;

  @IsString()
  public model: string;

  @IsEnum(Vehicle_category)
  public category: Vehicle_category;

  @IsEnum(Vehicle_type)
  public type: Vehicle_type;

  @IsInt()
  public autonomy: number;

  @IsInt()
  public chargingTime: number;

  @IsInt()
  public seatsCount: number;

  @IsInt()
  public price: number;

  @IsString()
  public imageUrl: string | null;

  @IsInt()
  public batteryCapacity: number;

  @IsInt()
  public maxChargingPower: number | null;
}
