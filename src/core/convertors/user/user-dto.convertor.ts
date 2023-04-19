import { Injectable } from '@nestjs/common';
import { UserLoginInfoReqDTO } from 'src/core/dto/user/user-req.dto';
import { UserLoginInfoResDTO } from 'src/core/dto/user/user-res.dto';
import { RefreshTokenResDto } from 'src/core/dto/auth/refresh-token-dto.class';
import { UserLoginInfoEntity } from 'src/core/entities';
import { UpdateProfileUserLoginInfoReqDTO } from 'src/core/dto/user/user-req-update-profile.dto';

@Injectable()
export class UserDtoConvertor {
  toEntityFromUserLoginInfoReqDTO(
    dto: UserLoginInfoReqDTO,
    hashPassword: string,
  ): UserLoginInfoEntity {
    const { firstname, lastname, username, role } = dto;

    return {
      firstname,
      lastname,
      password: hashPassword,
      username,
      refreshToken: null,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  toUserLoginInfoResDTOFromEntity(
    entities: UserLoginInfoEntity[],
  ): UserLoginInfoResDTO[] {
    return entities.map(
      ({ firstname, lastname, username, userLoginInfoId, role }) => ({
        firstname,
        lastname,
        username,
        userId: userLoginInfoId,
        role,
      }),
    );
  }

  toUserLoginInfoResDTOForCreate(
    entity: UserLoginInfoEntity,
    token: string,
    refreshToken: string,
  ): UserLoginInfoResDTO {
    const { firstname, lastname, username, userLoginInfoId } = entity;
    return {
      firstname,
      lastname,
      username,
      userId: userLoginInfoId,
      refreshToken,
      token,
    };
  }

  toUserLoginEntityForUpdateRefreshToken(
    refreshToken: string,
  ): UserLoginInfoEntity {
    return {
      refreshToken,
      updatedAt: new Date(), //format(, 'dd-MM-yyyy'),
    };
  }
  toRefreshTokenResDtoFromRefreshToken(
    token: string,
    refreshToken: string,
  ): RefreshTokenResDto {
    return { refreshToken, token };
  }

  toUpdateUserEntityFromDto(
    updateProfileUserLoginInfoReqDTO: UpdateProfileUserLoginInfoReqDTO,
  ): UserLoginInfoEntity {
    return { ...updateProfileUserLoginInfoReqDTO };
  }

  toUserLoginInfoResDTOFromGetMyProfile(
    entity: UserLoginInfoEntity,
  ): UserLoginInfoResDTO {
    const { firstname, lastname, username, userLoginInfoId, role } = entity;
    return {
      firstname,
      lastname,
      username,
      userId: userLoginInfoId,
      role,
    };
  }
  toUpdateUserEntityFromUpdatePasswordDto(
    password: string,
  ): UserLoginInfoEntity {
    return { password };
  }
  toUserIdsFromUserLoginInfoEntity(
    userId: number,
    userLoginInfoEntities: UserLoginInfoEntity[],
  ): number[] {
    const friendIds: number[] = userLoginInfoEntities.map(
      ({ userLoginInfoId }) => userLoginInfoId,
    );
    friendIds.push(userId);
    return friendIds;
  }
}
