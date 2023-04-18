import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserLoginInfoEntity } from 'src/core';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { UserLoginInfoModel } from '../sql/model/user.model';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import { UserFriendsEntity } from 'src/core/entities/user-friends/user-friends.entity';

export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: IGenericRepository<UserLoginInfoEntity>;
  userFriends: IGenericRepository<UserFriendsEntity>;

  constructor(
    @InjectModel(UserLoginInfoEntity.name)
    private userLoginInfoModel: Model<UserLoginInfoModel>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<UserLoginInfoEntity>(
      this.userLoginInfoModel,
    );
  }
}
