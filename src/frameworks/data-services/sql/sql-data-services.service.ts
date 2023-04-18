import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { UserLoginInfoModel } from './model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SQLGenericRepository } from './sql-generic-repository';
import { UserFriendsEntity } from 'src/core/entities/user-friends/user-friends.entity';
import { UserFriendsModel } from './model/user-friends.model';
import { UserLoginInfoEntity } from 'src/core';

@Injectable()
export class SQLDataService implements IDataServices, OnApplicationBootstrap {
  users: IGenericRepository<UserLoginInfoEntity>;
  userFriends: IGenericRepository<UserFriendsEntity>;

  constructor(
    @InjectRepository(UserLoginInfoModel)
    private usersRepository: Repository<UserLoginInfoEntity>,
    @InjectRepository(UserFriendsModel)
    private usersFriendsRepository: Repository<UserFriendsEntity>,
  ) {}

  onApplicationBootstrap() {
    this.users = new SQLGenericRepository<UserLoginInfoModel>(
      this.usersRepository,
    );

    this.userFriends = new SQLGenericRepository<UserFriendsModel>(
      this.usersFriendsRepository,
    );
  }
}
