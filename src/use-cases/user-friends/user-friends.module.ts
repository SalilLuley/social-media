import { Module } from '@nestjs/common';
import { ConvertorsModule } from 'src/core/convertors/convertors.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { UserFriendsUsecase } from './user-friends.usecase';

@Module({
  imports: [DataServicesModule, ConvertorsModule],
  providers: [UserFriendsUsecase],
  exports: [UserFriendsUsecase],
})
export class UserFriendsModule {}
