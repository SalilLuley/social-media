import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserLoginInfoEntity } from 'src/core';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { UserLoginInfoModel } from '../sql/model/user.model';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import { UserFriendsEntity } from 'src/core/entities/user-friends/user-friends.entity';
import { PostEntity } from 'src/core/entities/post/post.entity';
import { CommunityEntity } from 'src/core/entities/community/community.entity';
import { UserCommunityEntity } from 'src/core/entities/user-community/user-community.entity';

export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: IGenericRepository<UserLoginInfoEntity>;
  userFriends: IGenericRepository<UserFriendsEntity>;

  constructor(
    @InjectModel(UserLoginInfoEntity.name)
    private userLoginInfoModel: Model<UserLoginInfoModel>,
  ) {}
  userCommunity: IGenericRepository<UserCommunityEntity>;
  community: IGenericRepository<CommunityEntity>;
  post: IGenericRepository<PostEntity>;

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<UserLoginInfoEntity>(
      this.userLoginInfoModel,
    );
  }
}
