import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { UserLoginInfoModel } from './model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SQLGenericRepository } from './sql-generic-repository';
import { UserFriendsEntity } from 'src/core/entities/user-friends/user-friends.entity';
import { UserFriendsModel } from './model/user-friends.model';
import { UserLoginInfoEntity } from 'src/core';
import { PostEntity } from 'src/core/entities/post/post.entity';
import { PostModel } from './model/post.model';
import { CommunityEntity } from 'src/core/entities/community/community.entity';
import { CommunityModel } from './model/community.model';
import { UserCommunityEntity } from 'src/core/entities/user-community/user-community.entity';
import { UserCommunityModel } from './model/user-community.model';

@Injectable()
export class SQLDataService implements IDataServices, OnApplicationBootstrap {
  users: IGenericRepository<UserLoginInfoEntity>;
  userFriends: IGenericRepository<UserFriendsEntity>;
  post: IGenericRepository<PostEntity>;
  community: IGenericRepository<CommunityEntity>;
  userCommunity: IGenericRepository<UserCommunityEntity>;

  constructor(
    @InjectRepository(UserLoginInfoModel)
    private usersRepository: Repository<UserLoginInfoEntity>,
    @InjectRepository(UserFriendsModel)
    private usersFriendsRepository: Repository<UserFriendsEntity>,
    @InjectRepository(PostModel)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(CommunityModel)
    private communityRepository: Repository<CommunityEntity>,
    @InjectRepository(UserCommunityModel)
    private userCommunityRepository: Repository<UserCommunityEntity>,
  ) {}

  onApplicationBootstrap() {
    this.users = new SQLGenericRepository<UserLoginInfoModel>(
      this.usersRepository,
    );

    this.userFriends = new SQLGenericRepository<UserFriendsModel>(
      this.usersFriendsRepository,
    );
    this.post = new SQLGenericRepository<PostModel>(this.postRepository);
    this.community = new SQLGenericRepository<CommunityEntity>(
      this.communityRepository,
    );
    this.userCommunity = new SQLGenericRepository<UserCommunityModel>(
      this.userCommunityRepository,
    );
  }
}
