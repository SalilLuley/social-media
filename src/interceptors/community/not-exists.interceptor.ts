import { Observable } from 'rxjs';
import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
  CallHandler,
} from '@nestjs/common';
import { MESSAGES } from 'src/core/common/messages';
import { IDataServices } from 'src/core/abstracts';
import { CommunityEntity } from 'src/core/entities/community/community.entity';

@Injectable()
export class CommunityNotExistsInterceptor implements NestInterceptor {
  constructor(private databaseService: IDataServices) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const communityId = request.body.communityId;
    const communityEntity: CommunityEntity =
      await this.databaseService.community.get({ id: communityId });
    if (communityEntity === null) {
      throw new NotFoundException(MESSAGES.COMMUNITY.NOT_EXISTS);
    }
    return next.handle();
  }
}
