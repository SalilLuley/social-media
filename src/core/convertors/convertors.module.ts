import { Module } from '@nestjs/common';
import { UserDtoConvertor } from './user/user-dto.convertor';
import { AuthDtoConvertor } from './auth/auth-dto.convertor';
import { UserFriendsConvertor } from './user-friends/user-friends.convertor';
import { PostConvertor } from './post/post.convertor';
import { CommunityConvertor } from './community/community.convertor';

@Module({
  providers: [
    UserDtoConvertor,
    AuthDtoConvertor,
    UserFriendsConvertor,
    PostConvertor,
    CommunityConvertor,
  ],
  exports: [
    UserDtoConvertor,
    AuthDtoConvertor,
    UserFriendsConvertor,
    PostConvertor,
    CommunityConvertor,
  ],
})
export class ConvertorsModule {}
