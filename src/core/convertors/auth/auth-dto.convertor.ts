import { Injectable } from '@nestjs/common';
import { AuthLoginResDto } from 'src/core/dto/auth/auth-res-dto.class';
import { UserLoginInfoEntity } from 'src/core/entities';

@Injectable()
export class AuthDtoConvertor {
  toAuthLoginResDtoFromUserLoginInfoEntity(
    entity: UserLoginInfoEntity,
    token: string,
    refreshToken: string,
  ): AuthLoginResDto {
    const { userLoginInfoId, username } = entity;
    return {
      token,
      userId: userLoginInfoId,
      username,
      refreshToken,
    };
  }
}
