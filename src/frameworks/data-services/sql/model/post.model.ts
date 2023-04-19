import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('post')
export class PostModel extends BaseModel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id?: number;
  @Column({ type: 'int', name: 'author_id' })
  readonly authorId: number;
  @Column({ type: 'int', name: 'parent_id' })
  readonly parentId: number;
  @Column({ type: 'varchar', name: 'title' })
  readonly title: string;
  @Column({ type: 'varchar', name: 'meta_title' })
  readonly metaTitle: string;
  @Column({ type: 'varchar', name: 'slug' })
  readonly slug: string;
  @Column({ type: 'varchar', name: 'summary' })
  readonly summary: string;
  @Column({ type: 'tinyint', name: 'published' })
  readonly published: number;
  @Column({ type: 'date', name: 'published_at' })
  readonly publishedAt?: Date;
  @Column({ type: 'varchar', name: 'content' })
  readonly content: string;
}
