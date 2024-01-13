import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString } from 'class-validator';

export class FiltreDto {
  @IsString()
  public sessionId: string;

  @IsInt()
  public price_min: number | null;

  @IsInt()
  public price_max: number | null;

  @IsArray()
  @Type(() => Number)
  public valid_seat_count: Array<Number> | null;

  @IsArray()
  @Type(() => String)
  public valid_categories: Array<String> | null;

  @IsArray()
  @Type(() => String)
  public valid_types: Array<String> | null;
}
