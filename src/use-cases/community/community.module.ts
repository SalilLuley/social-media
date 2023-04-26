import { Module } from '@nestjs/common';
import { ConvertorsModule } from 'src/core/convertors/convertors.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { CommunityUsecase } from './community.usecase';

@Module({
  imports: [DataServicesModule, ConvertorsModule],
  providers: [CommunityUsecase],
  exports: [CommunityUsecase],
})
export class CommunityUsecaseModule {}
