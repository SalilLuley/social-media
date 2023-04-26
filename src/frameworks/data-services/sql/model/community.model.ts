import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('community')
export class CommunityModel extends BaseModel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id?: number;
  @Column({ type: 'varchar', name: 'title' })
  readonly title?: string;
  @Column({ type: 'text', name: 'desc' })
  readonly desc?: string;
}
