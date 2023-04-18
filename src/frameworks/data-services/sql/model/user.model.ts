import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('user_login_info')
export class UserLoginInfoModel extends BaseModel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_login_info_id' })
  readonly userLoginInfoId?: number;
  @Column({ type: 'varchar', name: 'username' })
  readonly username?: string;
  @Column({ type: 'varchar', name: 'firstname' })
  readonly firstname?: string;
  @Column({ type: 'varchar', name: 'lastname' })
  readonly lastname?: string;
  @Column({ type: 'varchar', name: 'password' })
  readonly password?: string;
  @Column({ type: 'varchar', name: 'refresh_token' })
  readonly refreshToken?: string;
  @Column({ type: 'varchar', name: 'role' })
  readonly role?: string;
}
