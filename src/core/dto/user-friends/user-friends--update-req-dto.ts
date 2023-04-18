import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserFriendsReqDto } from './user-friends-req-dto';

export class UpdateUserFriendsReqDto extends UserFriendsReqDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
