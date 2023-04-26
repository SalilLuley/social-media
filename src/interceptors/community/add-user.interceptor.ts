import { Observable } from 'rxjs';
import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { MESSAGES } from 'src/core/common/messages';
import { IDataServices } from 'src/core/abstracts';
import { UserCommunityEntity } from 'src/core/entities/user-community/user-community.entity';
import { CommunityEntity } from 'src/core/entities/community/community.entity';
import { UserLoginInfoEntity } from 'src/core';
import { CommunityRoleEnum } from 'src/core/common/enum/community-role.enum';

@Injectable()
export class CommunityAddUserInterceptor implements NestInterceptor {
  constructor(private databaseService: IDataServices) {}

  async intercept(context: ExecutionContext): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userLoginInfoId }: UserLoginInfoEntity = request.user;

    const addUserLoginInfoId = request.body.userLoginInfoId;
    const communityId = request.body.communityId;

    const communityEntity: CommunityEntity =
      await this.databaseService.community.get({ id: communityId });

    if (communityEntity === null) {
      throw new NotFoundException(MESSAGES.COMMUNITY.NOT_EXISTS);
    }

    const userCommunityEntity: UserCommunityEntity =
      await this.databaseService.userCommunity.get({
        userLoginInfoId,
        communityId,
      });

    if (userCommunityEntity === null) {
      throw new BadRequestException(MESSAGES.COMMUNITY.USER_NOT_BELONG);
    }

    if (userCommunityEntity.role !== CommunityRoleEnum.ADMIN) {
      throw new BadRequestException(MESSAGES.COMMUNITY.ONLY_ADMIN_CAN_ADD_USER);
    }

    const entities: UserCommunityEntity =
      await this.databaseService.userCommunity.get({
        userLoginInfoId: addUserLoginInfoId,
        communityId,
      });
    if (entities !== null) {
      throw new BadRequestException(MESSAGES.COMMUNITY.USER_ALREADY_EXISTS);
    }
    return;
  }
}
