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
import { PostReqDto } from 'src/core/dto/post/post-req-dto';
import { UpdatePostReqDTO } from 'src/core/dto/post/post-req-update-profile.dto';
import { PostResDto } from 'src/core/dto/post/post-res-dto';
import { RequestWithUser } from 'src/core/interfaces/request.interface';
import { IResponse } from 'src/core/interfaces/response.interface';
import { Roles } from 'src/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/guards/auth/accessToken.guard';
import { RolesGuard } from 'src/guards/roles.guard';

import { PostUsecase } from 'src/use-cases/post/post.usecase';

@Controller('post')
@ApiTags('Post')
@UseGuards(AccessTokenGuard, RolesGuard)
export class PostController {
  constructor(private postUsecase: PostUsecase) {}

  @Get('get-all')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async getAll(): Promise<IResponse<PostResDto[]>> {
    try {
      return await this.postUsecase.getAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-feed')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.USER)
  async getAllFeed(
    @Request() request: RequestWithUser,
  ): Promise<IResponse<PostResDto[]>> {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      return await this.postUsecase.getAllFeed(userLoginInfoId);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-one/:id')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async getOne(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<IResponse<PostResDto>> {
    try {
      return await this.postUsecase.getOne(userId);
    } catch (error) {
      throw error;
    }
  }

  @Post('create')
  @ApiBearerAuth()
  async saveUser(
    @Request() request: RequestWithUser,
    @Body() dto: PostReqDto,
  ): Promise<IResponse<PostResDto>> {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      return await this.postUsecase.create(userLoginInfoId, dto);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.USER, ROLES.ADMIN)
  async update(
    @Request() request: RequestWithUser,
    @Body() dto: UpdatePostReqDTO,
  ) {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      return await this.postUsecase.update(userLoginInfoId, dto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.USER)
  async delete(@Param('id', ParseIntPipe) userId: number) {
    try {
      return await this.postUsecase.delete(userId);
    } catch (error) {
      throw error;
    }
  }
}
