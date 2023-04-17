import { Observable } from 'rxjs';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MESSAGES } from 'src/core/common/messages';
import { UserLoginInfoEntity } from 'src/core';
import { RequestWithUser } from 'src/core/interfaces/request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest() as RequestWithUser;
    const { role }: UserLoginInfoEntity = request.user;
    if (!this.matchRoles(roles, role)) {
      throw new ForbiddenException(MESSAGES.ROLE.FORBIDDEN_RESOURCE);
    }
    return true;
  }

  matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }
}
