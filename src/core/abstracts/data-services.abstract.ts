import { IGenericRepository } from '.';
import { UserLoginInfoEntity } from '../entities';

export abstract class IDataServices {
  abstract users: IGenericRepository<UserLoginInfoEntity>;
}
