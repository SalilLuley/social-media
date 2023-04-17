import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordUserLoginInfoReqDTO {
  @ApiProperty({ required: true })
  @IsString()
  // @IsStrongPassword()
  readonly password: string;
}
