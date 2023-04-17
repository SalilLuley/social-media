import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserLoginInfoEntity } from 'src/core';
import { IDataServices } from 'src/core/abstracts';
import { MESSAGES } from 'src/core/common/messages';
import { UserDtoConvertor } from 'src/core/convertors/user/user-dto.convertor';
import { RefreshTokenResDto } from 'src/core/dto/auth/refresh-token-dto.class';
import { IResponse } from 'src/core/interfaces/response.interface';
import { BcryptService } from 'src/frameworks/bcrypt/bcrypt.service';
import { JWTDataService } from 'src/frameworks/jwt/jwt.dataservice';

@Injectable()
export class RefreshTokenUsecase {
  /**
   *
   */
  constructor(
    private userDtoConvertor: UserDtoConvertor,
    private databaseService: IDataServices,
    private bcryptService: BcryptService,
    private jwtDataService: JWTDataService,
  ) {}

  async refreshToken(
    id: number,
    rToken: string,
  ): Promise<IResponse<RefreshTokenResDto>> {
    const userLoginInfoEntity: UserLoginInfoEntity =
      await this.databaseService.users.get<UserLoginInfoEntity>({
        userLoginInfoId: id,
      });

    const isEqualRefreshToken = await this.bcryptService.compare(
      rToken,
      userLoginInfoEntity.refreshToken ?? '',
    );
    if (!isEqualRefreshToken) throw new ForbiddenException('Access Denied');

    const token = await this.jwtDataService.generateToken(
      userLoginInfoEntity.userLoginInfoId,
      userLoginInfoEntity.role,
    );

    const refreshToken = await this.jwtDataService.generateRefreshToken(
      userLoginInfoEntity.userLoginInfoId,
    );

    const data: RefreshTokenResDto =
      this.userDtoConvertor.toRefreshTokenResDtoFromRefreshToken(
        token,
        refreshToken,
      );
    return {
      data,
      message: MESSAGES.REFRESH_TOKEN.SUCCESS,
    };
  }
}
