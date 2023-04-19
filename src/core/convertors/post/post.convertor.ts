import { Injectable } from '@nestjs/common';
import { PostReqDto } from 'src/core/dto/post/post-req-dto';
import { UpdatePostReqDTO } from 'src/core/dto/post/post-req-update-profile.dto';
import { PostResDto } from 'src/core/dto/post/post-res-dto';
import { UserLoginInfoResDTO } from 'src/core/dto/user/user-res.dto';
import { UserLoginInfoEntity } from 'src/core/entities';
import { PostEntity } from 'src/core/entities/post/post.entity';

@Injectable()
export class PostConvertor {
  toResDtoFromEntity(entity: PostEntity): PostResDto {
    return { ...entity };
  }

  toResDtoFromEntities(entity: PostEntity[]): PostResDto[] {
    return entity.map((item) => ({ ...item }));
  }

  toModelFromDto(userId: number, dto: PostReqDto): PostEntity {
    return {
      ...dto,
      authorId: userId,
      publishedAt: new Date(),
    };
  }

  toUpdateModelFromDto(userId: number, dto: UpdatePostReqDTO): PostEntity {
    return {
      ...dto,
      authorId: userId,
      updatedAt: new Date(),
    };
  }

  toPostList(entities: UserLoginInfoEntity[]): UserLoginInfoResDTO[] {
    return entities.map(
      ({ firstname, lastname, userLoginInfoId, username }) => ({
        firstname,
        lastname,
        userId: userLoginInfoId,
        username,
      }),
    );
  }
}
