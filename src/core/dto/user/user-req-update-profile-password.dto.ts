import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordUserLoginInfoReqDTO {
  @ApiProperty({ required: true })
  @IsString()
  // @IsStrongPassword()
  readonly password: string;
}
