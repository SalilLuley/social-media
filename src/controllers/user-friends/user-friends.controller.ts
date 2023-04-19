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
import { UpdateUserFriendsReqDto } from 'src/core/dto/user-friends/user-friends--update-req-dto';
import { UserFriendsReqDto } from 'src/core/dto/user-friends/user-friends-req-dto';
import { UserFriendsResDto } from 'src/core/dto/user-friends/user-friends-res-dto';
import { RequestWithUser } from 'src/core/interfaces/request.interface';
import { IResponse } from 'src/core/interfaces/response.interface';
import { Roles } from 'src/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/guards/auth/accessToken.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserFriendsUsecase } from 'src/use-cases/user-friends/user-friends.usecase';

@Controller('user-friends')
@ApiTags('User Friends')
@UseGuards(AccessTokenGuard, RolesGuard)
export class UserFriendsController {
  constructor(private usecase: UserFriendsUsecase) {}

  @Get('get-all')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.USER)
  async getAll(): Promise<IResponse<UserFriendsResDto[]>> {
    try {
      return await this.usecase.getAll();
    } catch (error) {
      throw error;
    }
  }

  @Post('create')
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

  @Patch('update')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.USER)
  async update(
    @Body() dto: UpdateUserFriendsReqDto,
  ): Promise<IResponse<UserFriendsResDto>> {
    try {
      return await this.usecase.update(dto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<UserFriendsResDto>> {
    try {
      return await this.usecase.delete(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-one/:id')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<UserFriendsResDto>> {
    try {
      return await this.usecase.getOne(id);
    } catch (error) {
      throw error;
    }
  }
}
