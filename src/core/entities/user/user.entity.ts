import { BaseEntity } from '../base/base.entity';

export class UserLoginInfoEntity extends BaseEntity {
  userLoginInfoId?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  role?: string;
}
