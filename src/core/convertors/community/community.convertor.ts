import { Injectable } from '@nestjs/common';
import { CommunityAddUserReqDto } from 'src/core/dto/community/community-add-user-req.dto';
import { CommunityReqDto } from 'src/core/dto/community/community-req-dto';
import { UpdateCommunityReqDto } from 'src/core/dto/community/community-req-update-dto';
import { CommunityResDto } from 'src/core/dto/community/community-res-dto';
import { CommunityEntity } from 'src/core/entities/community/community.entity';
import { UserCommunityEntity } from 'src/core/entities/user-community/user-community.entity';

@Injectable()
export class CommunityConvertor {
  toResDtoFromEntity(entity: CommunityEntity): CommunityResDto {
    return { ...entity };
  }

  toResDtoFromEntities(entity: CommunityEntity[]): CommunityResDto[] {
    return entity.map((item) => ({ ...item }));
  }

  toModelFromDto(dto: CommunityReqDto): CommunityEntity {
    return { ...dto };
  }

  toUpdateModelFromDto(dto: UpdateCommunityReqDto): CommunityEntity {
    return {
      ...dto,
      id: undefined,
      updatedAt: new Date(),
    };
  }
  toAddUserUserCommunityEntity(
    dto: CommunityAddUserReqDto,
  ): UserCommunityEntity {
    return { ...dto };
  }
}
