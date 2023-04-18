import { Injectable } from '@nestjs/common';
import { UserLoginInfoEntity } from 'src/core';
import { IDataServices } from 'src/core/abstracts';
import { MESSAGES } from 'src/core/common/messages';
import { UserDtoConvertor } from 'src/core/convertors/user/user-dto.convertor';
import { UpdateProfileUserLoginInfoReqDTO } from 'src/core/dto/user/user-req-update-profile.dto';
import { UpdatePasswordUserLoginInfoReqDTO } from 'src/core/dto/user/user-req-update-profile-password.dto';
import { UserLoginInfoReqDTO } from 'src/core/dto/user/user-req.dto';
import { UserLoginInfoResDTO } from 'src/core/dto/user/user-res.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { BcryptService } from 'src/frameworks/bcrypt/bcrypt.service';
import { JWTDataService } from 'src/frameworks/jwt/jwt.dataservice';
@Injectable()
export class UserUsecase {
  constructor(
    private databaseService: IDataServices,
    private bcryptService: BcryptService,
    private userDtoConvertor: UserDtoConvertor,
    private jwtDataService: JWTDataService,
  ) {}

  async getAllUsers(): Promise<IResponse<UserLoginInfoResDTO[]>> {
    try {
      const userLoginInfoEntities: UserLoginInfoEntity[] =
        await this.databaseService.users.getAll();
      const data: UserLoginInfoResDTO[] =
        this.userDtoConvertor.toUserLoginInfoResDTOFromEntity(
          userLoginInfoEntities,
        );
      return {
        data,
        message: MESSAGES.USER.GET_ALL.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async create(
    userLoginInfoReqDTO: UserLoginInfoReqDTO,
  ): Promise<IResponse<UserLoginInfoResDTO>> {
    const hashPassword: string = await this.bcryptService.hash(
      userLoginInfoReqDTO.password,
    );
    const entity: UserLoginInfoEntity =
      this.userDtoConvertor.toEntityFromUserLoginInfoReqDTO(
        userLoginInfoReqDTO,
        hashPassword,
      );

    const userLoginInfoEntity: UserLoginInfoEntity =
      await this.databaseService.users.create(entity);

    const token = await this.jwtDataService.generateToken(
      userLoginInfoEntity.userLoginInfoId,
      userLoginInfoEntity.role,
    );

    const refreshToken = await this.jwtDataService.generateRefreshToken(
      userLoginInfoEntity.userLoginInfoId,
    );

    const data: UserLoginInfoResDTO =
      this.userDtoConvertor.toUserLoginInfoResDTOForCreate(
        userLoginInfoEntity,
        token,
        refreshToken,
      );

    return {
      data,
      message: MESSAGES.USER.GET_ALL.SUCCESS,
    };
  }

  async update(
    userId: number,
    updateProfileUserLoginInfoReqDTO: UpdateProfileUserLoginInfoReqDTO,
  ): Promise<IResponse<null>> {
    try {
      const userLoginInfoEntity: UserLoginInfoEntity =
        this.userDtoConvertor.toUpdateUserEntityFromDto(
          updateProfileUserLoginInfoReqDTO,
        );

      await this.databaseService.users.update(userId, userLoginInfoEntity);

      return {
        data: null,
        message: MESSAGES.USER.UPDATE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: number): Promise<IResponse<UserLoginInfoResDTO>> {
    try {
      await this.databaseService.users.delete(userId);
      return {
        data: null,
        message: MESSAGES.USER.DELETE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getOneUser(userId: number): Promise<IResponse<UserLoginInfoResDTO>> {
    try {
      const userLoginInfoEntity: UserLoginInfoEntity =
        await this.databaseService.users.get<UserLoginInfoEntity>({
          userLoginInfoId: userId,
        });
      const data: UserLoginInfoResDTO =
        this.userDtoConvertor.toUserLoginInfoResDTOFromGetMyProfile(
          userLoginInfoEntity,
        );
      return {
        data,
        message: MESSAGES.USER.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMyProfile(userId: number): Promise<IResponse<UserLoginInfoResDTO>> {
    try {
      const userLoginInfoEntity: UserLoginInfoEntity =
        await this.databaseService.users.get<UserLoginInfoEntity>({
          userLoginInfoId: userId,
        });
      const data: UserLoginInfoResDTO =
        this.userDtoConvertor.toUserLoginInfoResDTOFromGetMyProfile(
          userLoginInfoEntity,
        );
      return {
        data,
        message: MESSAGES.USER.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(
    userId: number,
    dto: UpdatePasswordUserLoginInfoReqDTO,
  ): Promise<IResponse<null>> {
    try {
      const { password } = dto;
      const hashPassword: string = await this.bcryptService.hash(password);

      const userLoginInfoEntity: UserLoginInfoEntity =
        this.userDtoConvertor.toUpdateUserEntityFromUpdatePasswordDto(
          hashPassword,
        );

      await this.databaseService.users.update(userId, userLoginInfoEntity);

      return {
        data: null,
        message: MESSAGES.USER.UPDATE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }
}
