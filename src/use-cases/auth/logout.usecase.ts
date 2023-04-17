import { Injectable } from '@nestjs/common';
import { UserLoginInfoEntity } from 'src/core';
import { IDataServices } from 'src/core/abstracts';
import { UserDtoConvertor } from 'src/core/convertors/user/user-dto.convertor';

@Injectable()
export class LogoutUsecase {
  /**
   *
   */
  constructor(
    private userDtoConvertor: UserDtoConvertor,
    private databaseService: IDataServices,
  ) {}
  async logout(userId: number): Promise<string[]> {
    const updateEntity: UserLoginInfoEntity =
      this.userDtoConvertor.toUserLoginEntityForUpdateRefreshToken(null);
    return await this.databaseService.users.update(userId, updateEntity);
  }
}
