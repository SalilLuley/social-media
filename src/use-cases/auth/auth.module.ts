import { Module } from '@nestjs/common';
import { LoginUsecase } from './login.usecase';
import { LogoutUsecase } from './logout.usecase';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenUsecase } from './refresh-token.usecase';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { LoggerModule } from 'src/frameworks/logger/logger.module';
import { CustomJwtModule } from 'src/frameworks/jwt/jwt.module';
import { BcryptModule } from 'src/frameworks/bcrypt/bcrypt.module';
import { ConvertorsModule } from 'src/core/convertors/convertors.module';

@Module({
  imports: [
    LoggerModule,
    DataServicesModule,
    BcryptModule,
    ConvertorsModule,
    CustomJwtModule,
    JwtModule,
  ],
  providers: [LoginUsecase, LogoutUsecase, RefreshTokenUsecase],
  exports: [LoginUsecase, LogoutUsecase, RefreshTokenUsecase],
})
export class LoginUsecaseModule {}
