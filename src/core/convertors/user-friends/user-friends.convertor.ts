import { Injectable } from '@nestjs/common';
import { UpdateUserFriendsReqDto } from 'src/core/dto/user-friends/user-friends--update-req-dto';
import { UserFriendsReqDto } from 'src/core/dto/user-friends/user-friends-req-dto';
import { UserFriendsResDto } from 'src/core/dto/user-friends/user-friends-res-dto';
import { UserFriendsEntity } from 'src/core/entities/user-friends/user-friends.entity';

@Injectable()
export class UserFriendsConvertor {
  toResDtoFromEntity(entity: UserFriendsEntity): UserFriendsResDto {
    return { ...entity };
  }

  toResDtoFromEntities(entity: UserFriendsEntity[]): UserFriendsResDto[] {
    return entity.map((item) => ({ ...item }));
  }

  toModelFromDto(userId: number, dto: UserFriendsReqDto): UserFriendsEntity {
    return {
      ...dto,
      sourceId: userId,
    };
  }

  toUpdateModelFromDto(dto: UpdateUserFriendsReqDto): UserFriendsEntity {
    return {
      ...dto,
      id: undefined,
      updatedAt: new Date(),
    };
  }
}
