import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { UserLoginInfoEntity } from 'src/core';
import { JwtPayload } from 'src/core/interfaces/jwt-payload.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): UserLoginInfoEntity {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return {
      userLoginInfoId: +payload.sub,
      refreshToken,
    };
  }
}
