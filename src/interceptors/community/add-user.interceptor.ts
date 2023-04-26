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

@Injectable()
export class CommunityAddUserInterceptor implements NestInterceptor {
  constructor(private databaseService: IDataServices) {}

  async intercept(context: ExecutionContext): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userLoginInfoId = request.body.userLoginInfoId;
    const communityId = request.body.communityId;
    const communityEntity: CommunityEntity =
      await this.databaseService.community.get({ id: communityId });
    if (communityEntity === null) {
      throw new NotFoundException(MESSAGES.COMMUNITY.NOT_EXISTS);
    }
    const entities: UserCommunityEntity =
      await this.databaseService.userCommunity.get({
        userLoginInfoId,
        communityId,
      });
    if (entities !== null) {
      throw new BadRequestException(MESSAGES.COMMUNITY.USER_ALREADY_EXISTS);
    }
    return;
  }
}
