import { Observable } from 'rxjs';
import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  BadRequestException,
  CallHandler,
} from '@nestjs/common';
import { MESSAGES } from 'src/core/common/messages';
import { IDataServices } from 'src/core/abstracts';
import { UserCommunityEntity } from 'src/core/entities/user-community/user-community.entity';
import { UserLoginInfoEntity } from 'src/core';
import { CommunityRoleEnum } from 'src/core/common/enum/community-role.enum';

@Injectable()
export class CommunityAdminInterceptor implements NestInterceptor {
  constructor(private databaseService: IDataServices) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const communityId = request.body.communityId;
    const { userLoginInfoId }: UserLoginInfoEntity = request.user;

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

    return next.handle();
  }
}
