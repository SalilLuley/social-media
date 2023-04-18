import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserFriendsReqDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly targetId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly status: number;
}
