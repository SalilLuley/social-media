import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { IResponse } from 'src/core/interfaces/response.interface';
import { AuthLoginReqDto } from 'src/core/dto/auth/auth-req-dto.class';
import { RequestWithUser } from 'src/core/interfaces/request.interface';
import { MESSAGES } from 'src/core/common/messages';
import { AuthLoginResDto } from 'src/core/dto/auth/auth-res-dto.class';
import { RefreshTokenResDto } from 'src/core/dto/auth/refresh-token-dto.class';
import { LoginUsecase } from 'src/use-cases/auth/login.usecase';
import { LogoutUsecase } from 'src/use-cases/auth/logout.usecase';
import { RefreshTokenUsecase } from 'src/use-cases/auth/refresh-token.usecase';
import { RefreshTokenUpdateInterceptor } from 'src/interceptors/refresh-token-update.interceptor';
import { RefreshTokenGuard } from 'src/guards/auth/refreshToken.guard';
import { AccessTokenGuard } from 'src/guards/auth/accessToken.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private loginUsecase: LoginUsecase,
    private logoutUsecase: LogoutUsecase,
    private refreshTokenUsecase: RefreshTokenUsecase,
  ) {}

  @Post('login')
  @UseInterceptors(RefreshTokenUpdateInterceptor)
  async loginIn(
    @Body() authLoginReqDto: AuthLoginReqDto,
  ): Promise<IResponse<AuthLoginResDto>> {
    try {
      return await this.loginUsecase.login(authLoginReqDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  async logout(@Request() request: RequestWithUser): Promise<IResponse<null>> {
    try {
      const {
        user: { userLoginInfoId },
      } = request;
      await this.logoutUsecase.logout(userLoginInfoId);
      return {
        data: null,
        message: MESSAGES.LOGOUT.SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('refresh')
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(RefreshTokenUpdateInterceptor)
  refreshToken(
    @Request() request: RequestWithUser,
  ): Promise<IResponse<RefreshTokenResDto>> {
    try {
      const {
        user: { userLoginInfoId, refreshToken },
      } = request;
      return this.refreshTokenUsecase.refreshToken(
        userLoginInfoId,
        refreshToken,
      );
    } catch (error) {
      throw error;
    }
  }
}
