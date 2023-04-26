import { Module } from '@nestjs/common';

import { ConvertorsModule } from 'src/core/convertors/convertors.module';
import { BcryptModule } from 'src/frameworks/bcrypt/bcrypt.module';
import { CustomJwtModule } from 'src/frameworks/jwt/jwt.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { LoginUsecaseModule } from 'src/use-cases/auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserUsecaseModule } from 'src/use-cases/user/user.module';
import { UserFriendsController } from './user-friends/user-friends.controller';
import { UserFriendsModule } from 'src/use-cases/user-friends/user-friends.module';
import { PostController } from './post/post.controller';
import { PostUsecaseModule } from 'src/use-cases/post/post.module';
import { CommunityController } from './community/community.controller';
import { CommunityUsecaseModule } from 'src/use-cases/community/community.module';

@Module({
  imports: [
    CustomJwtModule,
    ConvertorsModule,
    BcryptModule,
    DataServicesModule,
    LoginUsecaseModule,
    UserUsecaseModule,
    UserFriendsModule,
    PostUsecaseModule,
    CommunityUsecaseModule,
  ],
  controllers: [
    AuthController,
    UserController,
    UserFriendsController,
    PostController,
    CommunityController,
  ],
})
export class ControllersModule {}
