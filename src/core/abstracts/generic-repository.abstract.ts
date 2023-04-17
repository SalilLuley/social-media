export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract get<U>(properties: U): Promise<T>;
  abstract getAllByProperties<U>(properties: U): Promise<T[]>;
  abstract create(item: T): Promise<T>;
  abstract update(id: any, item: T);
  abstract delete(id: any);
}
