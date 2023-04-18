import { IGenericRepository } from '.';
import { UserLoginInfoEntity } from '../entities';
import { UserFriendsEntity } from '../entities/user-friends/user-friends.entity';

export abstract class IDataServices {
  abstract users: IGenericRepository<UserLoginInfoEntity>;
  abstract userFriends: IGenericRepository<UserFriendsEntity>;
}
