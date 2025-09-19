import { ConfigService } from "@nestjs/config";
import type { JwtModuleOptions } from "@nestjs/jwt";

export const getJwtConfig = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => ({
  secret: configService.getOrThrow<string>("JWT_SECRET"),
  signOptions: {
    algorithm: "HS256"
  },
  verifyOptions: {
    algorithms: ["HS256"],
    ignoreExpiration: false
  }
});
