import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { UserLoginInfoModel } from './model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SQLGenericRepository } from './sql-generic-repository';

@Injectable()
export class SQLDataService implements IDataServices, OnApplicationBootstrap {
  users: IGenericRepository<UserLoginInfoModel>;

  constructor(
    @InjectRepository(UserLoginInfoModel)
    private usersRepository: Repository<UserLoginInfoModel>,
  ) {}

  onApplicationBootstrap() {
    this.users = new SQLGenericRepository<UserLoginInfoModel>(
      this.usersRepository,
    );
  }
}
