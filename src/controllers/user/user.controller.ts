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
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/core/common/enum/roles.enum';
import { UpdateProfileUserLoginInfoReqDTO } from 'src/core/dto/user/user-req-update-profile.dto';
import { UpdatePasswordUserLoginInfoReqDTO } from 'src/core/dto/user/user-req-update-profile-password.dto';
import { UserLoginInfoReqDTO } from 'src/core/dto/user/user-req.dto';
import { RequestWithUser } from 'src/core/interfaces/request.interface';
import { Roles } from 'src/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/guards/auth/accessToken.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { RefreshTokenUpdateInterceptor } from 'src/interceptors/refresh-token-update.interceptor';
import { UserUsecase } from 'src/use-cases/user/user.usecase';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private userUsecase: UserUsecase) {}

  @Get('get-all')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async getAll() {
    try {
      return await this.userUsecase.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  @Get('get-one/:id')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    try {
      return await this.userUsecase.getOneUser(userId);
    } catch (error) {
      throw error;
    }
  }

  @Post('create')
  @ApiBearerAuth()
  @UseInterceptors(RefreshTokenUpdateInterceptor)
  async saveUser(@Body() dto: UserLoginInfoReqDTO) {
    try {
      return await this.userUsecase.create(dto);
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
    @Body() dto: UpdateProfileUserLoginInfoReqDTO,
  ) {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      return await this.userUsecase.update(userLoginInfoId, dto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async delete(@Param('id', ParseIntPipe) userId: number) {
    try {
      return await this.userUsecase.delete(userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-my-profile')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.USER, ROLES.ADMIN)
  async getMyProfile(@Request() request: RequestWithUser) {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      return await this.userUsecase.getMyProfile(userLoginInfoId);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update-password')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(ROLES.USER, ROLES.ADMIN)
  async updatePassword(
    @Request() request: RequestWithUser,
    @Body() dto: UpdatePasswordUserLoginInfoReqDTO,
  ) {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      return await this.userUsecase.updatePassword(userLoginInfoId, dto);
    } catch (error) {
      throw error;
    }
  }
}
