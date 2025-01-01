import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class TokenDto {
  @IsString()
  @Expose()
  accessToken: string;

  @IsString()
  @Expose()
  refreshToken: string;
}
