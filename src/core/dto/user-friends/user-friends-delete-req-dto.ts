import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserFriendsDeleteReqDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly friendId: number;
}
