import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { OrderService } from "./order.service";
import { JwtAuth } from "src/auth/decorators/jwt-auth.decorator";
import { OrderDto } from "./dto/order.dto";
import { CurrentUser } from "src/user/decorators/user.decorator";
import { PaymentStatusDto } from "./dto/payment-status.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("place")
  @HttpCode(HttpStatus.CREATED)
  @JwtAuth()
  checkout(@Body() dto: OrderDto, @CurrentUser("id") userId: string) {
    return this.orderService.createPayment(dto, userId);
  }

  @Post("status")
  @HttpCode(HttpStatus.OK)
  updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
