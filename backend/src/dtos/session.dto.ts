import { IsString, IsInt, IsEmail } from 'class-validator';

export class SessionDto {
  @IsString()
  public sessionId: string;

  @IsEmail()
  public email: string | null;

  @IsInt()
  public expires: number;

  @IsString()
  public data: string;
}
