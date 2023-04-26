import { CommunityRoleEnum } from 'src/core/common/enum/community-role.enum';
import { BaseEntity } from '../base/base.entity';

export class UserCommunityEntity extends BaseEntity {
  id?: number;
  userLoginInfoId?: number;
  communityId?: number;
  role?: CommunityRoleEnum;
}
