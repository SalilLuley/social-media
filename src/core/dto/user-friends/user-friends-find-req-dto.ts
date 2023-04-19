import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { USER_FRIEND_STATUS } from 'src/core/common/enum/user-friend-status.enum';

export class UserFindMyFriendsReqDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(USER_FRIEND_STATUS)
  readonly status?: USER_FRIEND_STATUS;
}
