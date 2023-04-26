import { BaseEntity } from '../base/base.entity';

export class UserCommunityEntity extends BaseEntity {
  id?: number;
  userLoginInfoId?: number;
  communityId?: number;
}
