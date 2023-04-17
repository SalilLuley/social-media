import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProfileUserLoginInfoReqDTO {
  @ApiProperty({ required: true })
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly firstname: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly lastname: string;
}
