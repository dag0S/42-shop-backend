import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import type { ConfigService } from "@nestjs/config";

import type { PrismaService } from "src/prisma/prisma.service";
import type { UserService } from "src/user/user.service";
import type { AuthDto } from "./dto/auth.dto";
import type { JwtPayload } from "./interfaces/jwt.interface";
import { Response } from "express";
import { OAuthRequest } from "./interfaces/o-auth.interface";

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      "JWT_ACCESS_TOKEN_TTL"
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      "JWT_REFRESH_TOKEN_TTL"
    );
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = this.generateTokens(user.id);

    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const existedUser = await this.userService.getByEmail(dto.email);

    if (existedUser)
      throw new BadRequestException("Пользователь уже существует");

    const user = await this.userService.create(dto);

    const tokens = this.generateTokens(user.id);

    return { user, ...tokens };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL
    });

    return {
      accessToken,
      refreshToken
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException("Пользователь не найден");

    return user;
  }

  async validateOAuthLogin(req: OAuthRequest) {
    let user = await this.userService.getByEmail(req.user.email);

    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          email: req.user.email,
          name: req.user.name,
          picture: req.user.picture
        },
        include: {
          stores: true,
          favorites: true,
          orders: true
        }
      });
    }

    const tokens = this.generateTokens(user.id);

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException("Невалидный refresh токен");

    const user = await this.userService.getById(result.id);

    const tokens = this.generateTokens(user!.id);

    return { user, ...tokens };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();

    expiresIn.setDate(expiresIn.getDate() + 7);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      domain: this.configService.getOrThrow<string>("SERVER_DOMAIN"),
      expires: expiresIn,
      secure: true,
      sameSite: "none"
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      domain: this.configService.getOrThrow<string>("SERVER_DOMAIN"),
      expires: new Date(0),
      secure: true,
      sameSite: "none"
    });
  }
}
