import { IGenericRepository } from 'src/core/abstracts';
import { USER_FRIEND_STATUS } from 'src/core/common/enum/user-friend-status.enum';
import { Repository } from 'typeorm';
import { In } from 'typeorm';

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

  async caseQuery(id: any, status: USER_FRIEND_STATUS) {
    return await this._repository.query(`SELECT 
    U.user_login_info_id as userLoginInfoId
FROM
    user_friends AS F,
    user_login_info AS U
WHERE
    CASE
        WHEN F.source_id = ${id} THEN F.target_id = U.user_login_info_id 
        WHEN F.target_id = ${id} THEN F.source_id = U.user_login_info_id
    END
        AND F.status = ${status};`);
  }

  async deleteByProperties(properties: any) {
    return await this._repository.delete({ ...properties });
  }
  async getAllByIdsIn(properties: any, propertyName: string): Promise<T[]> {
    const query: any = {
      [propertyName]: In(properties),
    };
    return await this._repository.findBy(query);
  }
}
