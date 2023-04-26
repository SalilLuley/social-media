import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/core/common/enum/roles.enum';
import { CommunityAddUserReqDto } from 'src/core/dto/community/community-add-user-req.dto';
import { CommunityReqDto } from 'src/core/dto/community/community-req-dto';
import { UpdateCommunityReqDto } from 'src/core/dto/community/community-req-update-dto';
import { CommunityResDto } from 'src/core/dto/community/community-res-dto';
import { RequestWithUser } from 'src/core/interfaces/request.interface';
import { IResponse } from 'src/core/interfaces/response.interface';
import { Roles } from 'src/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/guards/auth/accessToken.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CommunityAddUserInterceptor } from 'src/interceptors/community/add-user.interceptor';
import { CommunityUsecase } from 'src/use-cases/community/community.usecase';

@Controller('community')
@ApiTags('Community')
@UseGuards(AccessTokenGuard, RolesGuard)
export class CommunityController {
  constructor(private usecase: CommunityUsecase) {}

  @Get('get-all')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  async getAll(): Promise<IResponse<CommunityResDto[]>> {
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
    @Body() dto: CommunityReqDto,
  ): Promise<IResponse<CommunityResDto>> {
    try {
      return await this.usecase.create(dto);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  async update(
    @Body() dto: UpdateCommunityReqDto,
  ): Promise<IResponse<CommunityResDto>> {
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
  ): Promise<IResponse<CommunityResDto>> {
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
  ): Promise<IResponse<CommunityResDto>> {
    try {
      return await this.usecase.getOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-my-communities')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.USER)
  async getMyCommunities(
    @Request() request: RequestWithUser,
  ): Promise<IResponse<CommunityResDto[]>> {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      return await this.usecase.getMyCommunities(userLoginInfoId);
    } catch (error) {
      throw error;
    }
  }

  @Post('add-user')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.USER)
  @UseInterceptors(CommunityAddUserInterceptor)
  async addUser(
    @Body() dto: CommunityAddUserReqDto,
  ): Promise<IResponse<CommunityResDto>> {
    try {
      return await this.usecase.addUser(dto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('remove-user/:id')
  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  async removeUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<CommunityResDto>> {
    try {
      return await this.usecase.removeUser(id);
    } catch (error) {
      throw error;
    }
  }
}
