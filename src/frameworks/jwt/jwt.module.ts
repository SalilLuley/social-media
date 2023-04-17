import { Module } from '@nestjs/common';
import { JWTDataService } from './jwt.dataservice';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '../passport/passport.module';

@Module({
  imports: [PassportModule, JwtModule],
  providers: [JWTDataService],
  exports: [JWTDataService],
})
export class CustomJwtModule {}
