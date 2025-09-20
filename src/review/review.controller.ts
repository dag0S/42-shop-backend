import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from "@nestjs/common";

import { ReviewService } from "./review.service";
import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";
import { ReviewDto } from "./dto/review.dto";
import { CurrentUser } from "src/user/decorators/user.decorator";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get("by-storeId/:storeId")
  @JwtAuth()
  getByStoreId(@Param("storeId") storeId: string) {
    return this.reviewService.getByStoreId(storeId);
  }

  @Post(":storeId/:productId")
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  create(
    @CurrentUser("id") userId: string,
    @Body() dto: ReviewDto,
    @Param("storeId") storeId: string,
    @Param("productId") productId: string
  ) {
    return this.reviewService.create(dto, userId, productId, storeId);
  }

  @Delete(":reviewId")
  @HttpCode(HttpStatus.OK)
  @JwtAuth()
  delete(
    @CurrentUser("id") userId: string,
    @Param("reviewId") reviewId: string
  ) {
    return this.reviewService.delete(reviewId, userId);
  }
}
