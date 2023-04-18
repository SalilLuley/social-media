import { BaseEntity } from '../base/base.entity';

export class UserFriendsEntity extends BaseEntity {
  id?: number;
  sourceId?: number;
  targetId?: number;
  status?: number;
}
