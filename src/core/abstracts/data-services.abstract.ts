import { IGenericRepository } from '.';
import { UserLoginInfoEntity } from '../entities';
import { CommunityEntity } from '../entities/community/community.entity';
import { PostEntity } from '../entities/post/post.entity';
import { UserCommunityEntity } from '../entities/user-community/user-community.entity';
import { UserFriendsEntity } from '../entities/user-friends/user-friends.entity';

export abstract class IDataServices {
  abstract users: IGenericRepository<UserLoginInfoEntity>;
  abstract userFriends: IGenericRepository<UserFriendsEntity>;
  abstract post: IGenericRepository<PostEntity>;
  abstract community: IGenericRepository<CommunityEntity>;
  abstract userCommunity: IGenericRepository<UserCommunityEntity>;
}
