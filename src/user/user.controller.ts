import { Controller, Get, Param, Patch } from "@nestjs/common";

import { UserService } from "./user.service";
import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";
import { CurrentUser } from "./decorators/user.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @JwtAuth()
  getProfile(@CurrentUser("id") id: string) {
    return this.userService.getById(id);
  }

  @Patch("profile/favorites/:productId")
  @JwtAuth()
  toggleFavorite(
    @CurrentUser("id") userId: string,
    @Param("productId") productId: string
  ) {
    return this.userService.toggleFavorite(productId, userId);
  }
}
