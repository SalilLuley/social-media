import { Module } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { SQLDataService } from './sql-data-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoginInfoModel } from './model/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.model.js'],
      logging: ['query', 'error'],
    }),
    TypeOrmModule.forFeature([UserLoginInfoModel]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: SQLDataService,
    },
  ],
  exports: [IDataServices],
})
export class SQLDataServiceModule {}
