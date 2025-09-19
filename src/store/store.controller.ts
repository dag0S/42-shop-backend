import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from "@nestjs/common";

import { StoreService } from "./store.service";
import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";
import { CurrentUser } from "src/user/decorators/user.decorator";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@Controller("stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(":storeId")
  @JwtAuth()
  getById(
    @Param("storeId") storeId: string,
    @CurrentUser("id") userId: string
  ) {
    return this.storeService.getById(userId, storeId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  create(@CurrentUser("id") userId: string, @Body() dto: CreateStoreDto) {
    return this.storeService.create(dto, userId);
  }

  @Put(":storeId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  update(
    @Param("storeId") storeId: string,
    @CurrentUser("id") userId: string,
    @Body() dto: UpdateStoreDto
  ) {
    return this.storeService.update(dto, userId, storeId);
  }

  @Delete(":storeId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  delete(@Param("storeId") storeId: string, @CurrentUser("id") userId: string) {
    return this.storeService.delete(userId, storeId);
  }
}
