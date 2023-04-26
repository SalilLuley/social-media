import { Observable, tap } from 'rxjs';
import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { UserCommunityEntity } from 'src/core/entities/user-community/user-community.entity';
import { UserLoginInfoEntity } from 'src/core/entities/user/user.entity';
import { CommunityConvertor } from 'src/core/convertors/community/community.convertor';
import { CommunityRoleEnum } from 'src/core/common/enum/community-role.enum';

@Injectable()
export class CommunityCreateInterceptor implements NestInterceptor {
  constructor(
    private databaseService: IDataServices,
    private convertor: CommunityConvertor,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userLoginInfoId }: UserLoginInfoEntity = request.user;

    return next.handle().pipe(
      tap(async (response) => {
        const communityId = response['data']['id'];

        const entity: UserCommunityEntity =
          this.convertor.toAddUserUserCommunityEntity({
            communityId,
            userLoginInfoId,
            role: CommunityRoleEnum.ADMIN,
          });

        await this.databaseService.userCommunity.create(entity);
      }),
    );
  }
}
