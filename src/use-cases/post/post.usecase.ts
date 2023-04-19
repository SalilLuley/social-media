import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { USER_FRIEND_STATUS } from 'src/core/common/enum/user-friend-status.enum';
import { MESSAGES } from 'src/core/common/messages';
import { PostConvertor } from 'src/core/convertors/post/post.convertor';
import { UserDtoConvertor } from 'src/core/convertors/user/user-dto.convertor';
import { PostReqDto } from 'src/core/dto/post/post-req-dto';
import { UpdatePostReqDTO } from 'src/core/dto/post/post-req-update-profile.dto';
import { PostResDto } from 'src/core/dto/post/post-res-dto';
import { PostEntity } from 'src/core/entities/post/post.entity';
import { UserLoginInfoEntity } from 'src/core/entities/user/user.entity';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class PostUsecase {
  constructor(
    private databaseService: IDataServices,
    private convertor: PostConvertor,
    private userConvertor: UserDtoConvertor,
  ) {}

  async create(
    userId: number,
    dto: PostReqDto,
  ): Promise<IResponse<PostResDto>> {
    try {
      const postEntity: PostEntity = this.convertor.toModelFromDto(userId, dto);
      const entity: PostEntity = await this.databaseService.post.create(
        postEntity,
      );
      const data: PostResDto = this.convertor.toResDtoFromEntity(entity);
      return {
        data,
        message: MESSAGES.POST.CREATE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<IResponse<PostResDto[]>> {
    try {
      const entities: PostEntity[] = await this.databaseService.post.getAll();
      const data: PostResDto[] = this.convertor.toResDtoFromEntities(entities);
      return {
        data,
        message: MESSAGES.POST.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    userId: number,
    dto: UpdatePostReqDTO,
  ): Promise<IResponse<PostResDto>> {
    try {
      const { id } = dto;
      const entity: PostEntity = this.convertor.toUpdateModelFromDto(
        userId,
        dto,
      );
      await this.databaseService.post.update(id, entity);
      return {
        data: null,
        message: MESSAGES.POST.UPDATE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number): Promise<IResponse<null>> {
    try {
      await this.databaseService.post.delete(id);
      return {
        data: null,
        message: MESSAGES.POST.DELETE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: number): Promise<IResponse<PostResDto>> {
    try {
      const data: PostEntity = await this.databaseService.post.get(id);
      return {
        data,
        message: MESSAGES.POST.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllFeed(userId: number): Promise<IResponse<PostResDto[]>> {
    try {
      const userLoginInfoEntities: UserLoginInfoEntity[] =
        await this.databaseService.userFriends.caseQuery(
          userId,
          USER_FRIEND_STATUS.REQUEST_SEND,
        );

      const friendIds: number[] =
        this.userConvertor.toUserIdsFromUserLoginInfoEntity(
          userId,
          userLoginInfoEntities,
        );

      const entities: PostEntity[] =
        await this.databaseService.post.getAllByIdsIn(friendIds, 'authorId');
      const data: PostResDto[] = this.convertor.toResDtoFromEntities(entities);
      return {
        data,
        message: MESSAGES.POST.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }
}
