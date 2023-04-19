import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/core/common/enum/roles.enum';
import { UpdateUserFriendsReqDto } from 'src/core/dto/user-friends/user-friends-update-req-dto';
import { UserFindMyFriendsReqDto } from 'src/core/dto/user-friends/user-friends-find-req-dto';
import { UserFriendsReqDto } from 'src/core/dto/user-friends/user-friends-req-dto';
import { UserFriendsResDto } from 'src/core/dto/user-friends/user-friends-res-dto';
import { UserLoginInfoResDTO } from 'src/core/dto/user/user-res.dto';
import { RequestWithUser } from 'src/core/interfaces/request.interface';
import { IResponse } from 'src/core/interfaces/response.interface';
import { Roles } from 'src/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/guards/auth/accessToken.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserFriendsUsecase } from 'src/use-cases/user-friends/user-friends.usecase';
import { UpdateUserFriendsDeleteReqDto } from 'src/core/dto/user-friends/user-friends-delete-req-dto';

@Controller('user-friends')
@ApiTags('User Friends')
@UseGuards(AccessTokenGuard, RolesGuard)
export class UserFriendsController {
  constructor(private usecase: UserFriendsUsecase) {}

  @Post('send-friend-request')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.USER)
  async create(
    @Request() requestWithUser: RequestWithUser,
    @Body() dto: UserFriendsReqDto,
  ): Promise<IResponse<UserFriendsResDto>> {
    try {
      const {
        user: { userLoginInfoId },
      } = requestWithUser;
      return await this.usecase.create(userLoginInfoId, dto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-friend-request')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.USER)
  async delete(
    @Request() request: RequestWithUser,
    @Body() dto: UpdateUserFriendsDeleteReqDto,
  ): Promise<IResponse<UserFriendsResDto>> {
    const {
      user: { userLoginInfoId },
    } = request;
    try {
      return await this.usecase.delete(userLoginInfoId, dto);
    } catch (error) {
      throw error;
    }
  }

  @Get('find-my-friends')
  @ApiBearerAuth()
  @Roles(ROLES.USER, ROLES.ADMIN)
  async findMyFriends(
    @Request() request: RequestWithUser,
    @Body() dto: UserFindMyFriendsReqDto,
  ): Promise<IResponse<UserLoginInfoResDTO[]>> {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      return await this.usecase.findMyFriends(userLoginInfoId, dto);
    } catch (error) {
      throw error;
    }
  }
}
