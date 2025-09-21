import { Injectable } from "@nestjs/common";
import { ICapturePayment, YooCheckout } from "@a2seven/yoo-checkout";
import { EnumOrderStatus } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./dto/order.dto";
import { PaymentStatusDto } from "./dto/payment-status.dto";

const checkout = new YooCheckout({
  shopId: process.env["YOOKASSA_SHOP_ID"] as string,
  secretKey: process.env["YOOKASSA_SECRET_KEY"] as string
});

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map(
      ({ price, productId, quantity, storeId }) => ({
        quantity,
        price,
        productId,
        storeId
      })
    );

    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = await this.prismaService.order.create({
      data: {
        status: dto.status,
        items: {
          create: orderItems
        },
        total,
        userId
      }
    });

    const payment = await checkout.createPayment({
      amount: {
        value: total.toFixed(2),
        currency: "RUB"
      },
      payment_method_data: {
        type: "bank_card"
      },
      confirmation: {
        type: "redirect",
        return_url: `${process.env["CLIENT_URL"]}/thanks`
      },
      description: `Опалата заказа в магазине 42 SHOP. Id платежа: #${order.id}`
    });

    return payment;
  }

  async updateStatus(dto: PaymentStatusDto) {
    if (dto.event === "payment.waiting_for_capture") {
      const capturePayment: ICapturePayment = {
        amount: {
          value: dto.object.amount.value,
          currency: dto.object.amount.currency
        }
      };

      return checkout.capturePayment(dto.object.id, capturePayment);
    }

    if (dto.event === "refund.succeeded") {
      const orderId = dto.object.description.split("#")[1];

      await this.prismaService.order.update({
        where: {
          id: orderId
        },
        data: {
          status: EnumOrderStatus.PAYED
        }
      });

      return true;
    }

    return true;
  }
}
