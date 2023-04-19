import { BaseEntity } from '../base/base.entity';

export class PostEntity extends BaseEntity {
  readonly id?: number;
  readonly authorId: number;
  readonly parentId: number;
  readonly title: string;
  readonly metaTitle: string;
  readonly slug: string;
  readonly summary: string;
  readonly published: number;
  readonly publishedAt?: Date;
  readonly content: string;
}
