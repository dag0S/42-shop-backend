import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import type { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: AuthDto) {
    return this.authService.login(res, dto);
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: AuthDto
  ) {
    return this.authService.register(res, dto);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return await this.authService.refresh(req, res);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() _req) {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, ...response } =
      await this.authService.validateOAuthLogin(req);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return res.redirect(
      `${process.env["CLIENT_URL"]}/dashboard?accessToken=${response.accessToken}`
    );
  }

  @Get("yandex")
  @UseGuards(AuthGuard("yandex"))
  async yandexAuth(@Req() _req) {}

  @Get("yandex/callback")
  @UseGuards(AuthGuard("yandex"))
  async yandexAuthCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, ...response } =
      await this.authService.validateOAuthLogin(req);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return res.redirect(
      `${process.env["CLIENT_URL"]}/dashboard?accessToken=${response.accessToken}`
    );
  }
}
