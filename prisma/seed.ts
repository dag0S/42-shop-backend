import { PrismaClient, EnumOrderStatus } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

// генрация данных
async function up() {
  console.log("🌱 Сидинг базы данных...");

  // 1. Пользователь
  const user = await prisma.user.create({
    data: {
      email: "danila@mail.ru",
      password: await hash("Qwerty1234"),
      name: "Данила Государев"
    }
  });

  // 2. Два магазина одного пользователя
  const store1 = await prisma.store.create({
    data: {
      title: "5opka",
      description: "Мерч стримера и исполнителя 5opka.",
      userId: user.id
    }
  });

  const store2 = await prisma.store.create({
    data: {
      title: "MellSher",
      description: "Мерч стримера и исполнителя MellSher.",
      userId: user.id
    }
  });

  // 3. Категории
  await prisma.category.createMany({
    data: [
      {
        id: "1",
        title: "Футболки",
        description: "Футболки мерч 5opka",
        storeId: store1.id
      },
      {
        id: "2",
        title: "Худи",
        description: "Худи мерч 5opka",
        storeId: store1.id
      },
      {
        id: "3",
        title: "Свитшоты",
        description: "Свитшоты мерч 5opka",
        storeId: store1.id
      },
      {
        id: "4",
        title: "Футболки",
        description: "Футболки мерч MellSher",
        storeId: store2.id
      },
      {
        id: "5",
        title: "Худи",
        description: "Худи мерч MellSher",
        storeId: store2.id
      },
      {
        id: "6",
        title: "Свитшоты",
        description: "Свитшоты мерч MellSher",
        storeId: store2.id
      }
    ]
  });

  // 4. Цвета
  await prisma.color.createMany({
    data: [
      {
        id: "1",
        name: "Чёрный",
        value: "#000000",
        storeId: store1.id
      },
      {
        id: "2",
        name: "Коричневый",
        value: "#331a00",
        storeId: store1.id
      },
      {
        id: "3",
        name: "Белый",
        value: "#ffffff",
        storeId: store1.id
      },
      {
        id: "4",
        name: "Серый",
        value: "#808080",
        storeId: store1.id
      },
      {
        id: "5",
        name: "Чёрный",
        value: "#000000",
        storeId: store2.id
      },
      {
        id: "6",
        name: "Белый",
        value: "#ffffff",
        storeId: store2.id
      }
    ]
  });

  // 5. Товары
  await prisma.product.createMany({
    data: [
      {
        id: "1",
        title: '"42 братуха" v2',
        description: `Материал: 2х нитка пенье 240 гр/м²
Состав: 95% хлопок 5% лайкра
Нанесение: Шелкография
Крой: Оверсайз
Рост моделей: 183/160
Размер на моделях: M/S

Отправляем в течение недели с момента заказа`,
        price: 3000,
        images: [
          "/uploads/products/kf4fh8laqj3j5nc8dbr5b96d.webp",
          "/uploads/products/i26a30kxxqlmkigypvnpum3l.webp",
          "/uploads/products/j8b226s06isgsj6wfihs51wd.webp"
        ],
        categoryId: "1",
        colorId: "1",
        storeId: store1.id,
        userId: user.id
      }
    ]
  });

  // 6. Отзывы
  await prisma.review.createMany({
    data: [
      {
        text: "Спасибо! Качественная футболка! )))",
        rating: 5,
        userId: user.id,
        productId: "1",
        storeId: store1.id
      }
    ]
  });

  // 7. Заказы
  await prisma.order.createMany({
    data: [
      {
        id: "1",
        status: EnumOrderStatus.PAYED,
        total: 6000,
        userId: user.id
      }
    ]
  });

  await prisma.orderItem.createMany({
    data: [
      {
        quantity: 2,
        price: 3000,
        orderId: "1",
        productId: "1",
        storeId: store1.id
      }
    ]
  });

  console.log("✅ Сидинг завершён!");
}

// удаление данных
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "store" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "color" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "review" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "order" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "order_item" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
