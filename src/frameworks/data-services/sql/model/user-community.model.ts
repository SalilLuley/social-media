import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('user_community')
export class UserCommunityModel extends BaseModel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id?: number;
  @Column({ type: 'int', name: 'user_login_info_id' })
  readonly userLoginInfoId?: number;
  @Column({ type: 'int', name: 'community_id' })
  readonly communityId?: number;
  @Column({ type: 'int', name: 'role' })
  readonly role?: number;
}
