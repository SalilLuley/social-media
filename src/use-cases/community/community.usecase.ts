import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { MESSAGES } from 'src/core/common/messages';
import { CommunityConvertor } from 'src/core/convertors/community/community.convertor';
import { CommunityAddUserReqDto } from 'src/core/dto/community/community-add-user-req.dto';
import { CommunityReqDto } from 'src/core/dto/community/community-req-dto';
import { UpdateCommunityReqDto } from 'src/core/dto/community/community-req-update-dto';
import { CommunityResDto } from 'src/core/dto/community/community-res-dto';
import { CommunityEntity } from 'src/core/entities/community/community.entity';
import { UserCommunityEntity } from 'src/core/entities/user-community/user-community.entity';
import { IResponse } from 'src/core/interfaces/response.interface';

@Injectable()
export class CommunityUsecase {
  constructor(
    private databaseService: IDataServices,
    private convertor: CommunityConvertor,
  ) {}

  async create(dto: CommunityReqDto): Promise<IResponse<CommunityResDto>> {
    try {
      const CommunityEntity: CommunityEntity =
        this.convertor.toModelFromDto(dto);
      const entity: CommunityEntity =
        await this.databaseService.community.create(CommunityEntity);
      const data: CommunityResDto = this.convertor.toResDtoFromEntity(entity);
      return {
        data,
        message: MESSAGES.COMMUNITY.CREATE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<IResponse<CommunityResDto[]>> {
    try {
      const entities: CommunityEntity[] =
        await this.databaseService.community.getAll();

      const data: CommunityResDto[] =
        this.convertor.toResDtoFromEntities(entities);

      return {
        data,
        message: MESSAGES.COMMUNITY.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    dto: UpdateCommunityReqDto,
  ): Promise<IResponse<CommunityResDto>> {
    try {
      const { id } = dto;
      const entity: CommunityEntity = this.convertor.toUpdateModelFromDto(dto);
      await this.databaseService.community.update(id, entity);
      return {
        data: null,
        message: MESSAGES.COMMUNITY.UPDATE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<IResponse<null>> {
    try {
      await this.databaseService.community.delete(id);
      return {
        data: null,
        message: MESSAGES.COMMUNITY.DELETE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: number): Promise<IResponse<CommunityResDto>> {
    try {
      const data: CommunityEntity = await this.databaseService.community.get(
        id,
      );
      return {
        data,
        message: MESSAGES.USER_ADDRESS.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async addUser(
    dto: CommunityAddUserReqDto,
  ): Promise<IResponse<CommunityResDto>> {
    try {
      const entity: UserCommunityEntity =
        this.convertor.toAddUserUserCommunityEntity(dto);
      const data: UserCommunityEntity =
        await this.databaseService.userCommunity.create(entity);
      return {
        data,
        message: MESSAGES.USER_ADDRESS.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  async removeUser(id: number): Promise<IResponse<null>> {
    try {
      await this.databaseService.userCommunity.delete(id);
      return {
        data: null,
        message: MESSAGES.COMMUNITY.DELETE.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }
  async getMyCommunities(
    userLoginInfoId: number,
  ): Promise<IResponse<CommunityResDto[]>> {
    try {
      const userCommunityEntities: UserCommunityEntity[] =
        await this.databaseService.userCommunity.getAllByProperties({
          userLoginInfoId,
        });

      const entities: CommunityEntity[] = await Promise.all(
        userCommunityEntities.map(({ communityId }) =>
          this.databaseService.community.get({
            id: communityId,
          }),
        ),
      );

      const data: CommunityResDto[] =
        this.convertor.toResDtoFromEntities(entities);

      return {
        data,
        message: MESSAGES.COMMUNITY.GET.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }
}
