// import { Observable } from 'rxjs';
// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { MESSAGES } from 'src/core/common/messages';
// import { UserLoginInfoEntity } from 'src/core';
// import { RequestWithUser } from 'src/core/interfaces/request.interface';
// import { IDataServices } from 'src/core/abstracts';
// import { UserCommunityEntity } from 'src/core/entities/user-community/user-community.entity';

// @Injectable()
// export class AddUserGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private databaseService: IDataServices,
//   ) {}

//   canActivate(
//     context: ExecutionContext,
//   ): Promise<boolean | Promise<boolean> | Observable<boolean>> {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest() as RequestWithUser;
//     const { userLoginInfoId }: UserLoginInfoEntity = request.user;
//     const entities: UserCommunityEntity[] =
//       await this.databaseService.userCommunity.getAllByProperties({
//         userLoginInfoId,
//       });
//     if (entities.length > 0) {
//       throw new ForbiddenException(MESSAGES.ROLE.FORBIDDEN_RESOURCE);
//     }
//     return true;
//   }
// }
