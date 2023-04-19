import { Model } from 'mongoose';
import { IGenericRepository } from 'src/core/abstracts';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  /**
   *
   */
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }
  deleteByProperties<U>(properties: U): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  caseQuery(id: any) {
    throw new Error('Method not implemented.');
  }

  get<U>(properties: U): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getAllByProperties<U>(properties: U): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  create(item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(id: any, item: T) {
    throw new Error('Method not implemented.');
  }
  delete(id: any) {
    throw new Error('Method not implemented.');
  }
  async getAll(): Promise<T[]> {
    return await this._repository.find().populate(this._populateOnFind).exec();
  }
}
