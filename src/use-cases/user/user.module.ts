import { Module } from '@nestjs/common';
import { UserUsecase } from './user.usecase';
import { ConvertorsModule } from 'src/core/convertors/convertors.module';
import { BcryptModule } from 'src/frameworks/bcrypt/bcrypt.module';
import { CustomJwtModule } from 'src/frameworks/jwt/jwt.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';

@Module({
  imports: [
    DataServicesModule,
    BcryptModule,
    ConvertorsModule,
    CustomJwtModule,
  ],
  providers: [UserUsecase],
  exports: [UserUsecase],
})
export class UserUsecaseModule {}
