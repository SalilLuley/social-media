import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserLoginInfoResDTO {
  @ApiProperty({ required: true })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ required: true })
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly firstname: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly lastname: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly token?: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly refreshToken?: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly role?: string;
}
