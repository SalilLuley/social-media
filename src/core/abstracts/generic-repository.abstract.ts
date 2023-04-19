import { USER_FRIEND_STATUS } from '../common/enum/user-friend-status.enum';

export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract get<U>(properties: U): Promise<T>;
  abstract getAllByProperties<U>(properties: U): Promise<T[]>;
  abstract create(item: T): Promise<T>;
  abstract update(id: any, item: T);
  abstract delete(id: any);
  abstract deleteByProperties(properties: any);
  abstract caseQuery(id: any, status: USER_FRIEND_STATUS);
}
