import { UserLoginInfoEntity } from '../entities';

export type RequestWithUser = Request & { user: UserLoginInfoEntity };
