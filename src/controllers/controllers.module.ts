import { Module } from '@nestjs/common';

import { ConvertorsModule } from 'src/core/convertors/convertors.module';
import { BcryptModule } from 'src/frameworks/bcrypt/bcrypt.module';
import { CustomJwtModule } from 'src/frameworks/jwt/jwt.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { LoginUsecaseModule } from 'src/use-cases/auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserUsecaseModule } from 'src/use-cases/user/user.module';

@Module({
  imports: [
    CustomJwtModule,
    ConvertorsModule,
    BcryptModule,
    DataServicesModule,
    LoginUsecaseModule,
    UserUsecaseModule,
  ],
  controllers: [AuthController, UserController],
})
export class ControllersModule {}
