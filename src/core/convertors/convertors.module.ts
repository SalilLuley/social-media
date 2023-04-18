import { Module } from '@nestjs/common';
import { UserDtoConvertor } from './user/user-dto.convertor';
import { AuthDtoConvertor } from './auth/auth-dto.convertor';
import { UserFriendsConvertor } from './user-friends/user-friends.convertor';

@Module({
  providers: [UserDtoConvertor, AuthDtoConvertor, UserFriendsConvertor],
  exports: [UserDtoConvertor, AuthDtoConvertor, UserFriendsConvertor],
})
export class ConvertorsModule {}
