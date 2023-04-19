import { Module } from '@nestjs/common';
import { ConvertorsModule } from 'src/core/convertors/convertors.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { PostUsecase } from './post.usecase';

@Module({
  imports: [DataServicesModule, ConvertorsModule],
  providers: [PostUsecase],
  exports: [PostUsecase],
})
export class PostModule {}
