import { IGenericRepository } from 'src/core/abstracts';
import { Repository } from 'typeorm';

export class SQLGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Repository<T>;
  private _populateOnFind: any[];

  constructor(repository: Repository<T>, populateOnFind: any[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  create(item: T): Promise<T> {
    return this._repository.save(item);
  }

  getAll(): Promise<T[]> {
    return this._repository.find({
      select: this._populateOnFind,
    });
  }

  get(properties: any): Promise<T> {
    return this._repository.findOne({
      select: this._populateOnFind,
      where: { ...properties },
    });
  }

  update(id: number, item: any) {
    return this._repository.update(id, item);
  }

  getAllByProperties(properties: any): Promise<T[]> {
    return this._repository.find({
      select: this._populateOnFind,
      where: { ...properties },
    });
  }
  delete(id: any) {
    return this._repository.delete(id);
  }
}
