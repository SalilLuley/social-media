import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('user_friends')
export class UserFriendsModel extends BaseModel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id?: number;
  @Column({ type: 'int', name: 'source_id' })
  readonly sourceId?: number;
  @Column({ type: 'int', name: 'target_id' })
  readonly targetId?: number;
  @Column({ type: 'int', name: 'lastname' })
  readonly status?: number;
}
