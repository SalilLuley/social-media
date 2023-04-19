import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { MESSAGES } from 'src/core/common/messages';
import { UserFriendsConvertor } from 'src/core/convertors/user-friends/user-friends.convertor';
import { UpdateUserFriendsReqDto } from 'src/core/dto/user-friends/user-friends--update-req-dto';
import { UserFriendsReqDto } from 'src/core/dto/user-friends/user-friends-req-dto';
import { UserFriendsResDto } from 'src/core/dto/user-friends/user-friends-res-dto';
import { UserFriendsEntity } from 'src/core/entities/user-friends/user-friends.entity';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class UserFriendsUsecase {
  constructor(
    private databaseService: IDataServices,
    private convertor: UserFriendsConvertor,
  ) {}

  async create(
    userId: number,
    dto: UserFriendsReqDto,
  ): Promise<IResponse<UserFriendsResDto>> {
    try {
      const userFriendsEntity: UserFriendsEntity =
        this.convertor.toModelFromDto(userId, dto);
      const entity: UserFriendsEntity =
        await this.databaseService.userFriends.create(userFriendsEntity);
      const data: UserFriendsResDto = this.convertor.toResDtoFromEntity(entity);
      return {
        data,
        message: MESSAGES.USER_FRIENDS.CREATE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<IResponse<UserFriendsResDto[]>> {
    try {
      const entities: UserFriendsEntity[] =
        await this.databaseService.userFriends.getAll();

      const data: UserFriendsResDto[] =
        this.convertor.toResDtoFromEntities(entities);

      return {
        data,
        message: MESSAGES.USER_FRIENDS.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    dto: UpdateUserFriendsReqDto,
  ): Promise<IResponse<UserFriendsResDto>> {
    try {
      const { id } = dto;
      const entity: UserFriendsEntity =
        this.convertor.toUpdateModelFromDto(dto);
      await this.databaseService.userFriends.update(id, entity);
      return {
        data: null,
        message: MESSAGES.USER_FRIENDS.UPDATE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<IResponse<null>> {
    try {
      await this.databaseService.userFriends.delete(id);
      return {
        data: null,
        message: MESSAGES.USER_FRIENDS.DELETE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: number): Promise<IResponse<UserFriendsResDto>> {
    try {
      const data: UserFriendsEntity =
        await this.databaseService.userFriends.get(id);
      return {
        data,
        message: MESSAGES.USER_ADDRESS.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }
}
