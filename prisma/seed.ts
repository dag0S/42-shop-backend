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
        title: "42 братуха v2",
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
      },
      {
        id: "2",
        title: "42 братуха v2 варёная",
        description: `Материал: 2х нитка пенье 240 гр/м²
Состав: 95% хлопок 5% лайкра
Нанесение: Шелкография
Крой: Оверсайз
Окрашено методом Garment Dye
Рост моделей: 183/160
Размер на моделях: M/S

Отправляем в течение недели с момента заказа`,
        price: 3500,
        images: [
          "/uploads/products/a8weabhy5ka23lbnw7dcklug.webp",
          "/uploads/products/a8weabhy5ka23lbnw7dcklug2.webp",
          "/uploads/products/hurgchlmu24bi6pthp1qxhqz.webp"
        ],
        categoryId: "1",
        colorId: "2",
        storeId: store1.id,
        userId: user.id
      },
      {
        id: "3",
        title: "Ангел",
        description: `Материал: 2х нитка пенье 240 гр/м²
Состав: 95% хлопок 5% лайкра
Нанесение: Шелкография
Крой: Оверсайз
Рост моделей: 183/160
Размер на моделях: M/S

Отправляем в течение недели с момента заказа`,
        price: 3200,
        images: [
          "/uploads/products/pas9m9q8k0x09v2fxzwy6uoi.webp",
          "/uploads/products/ccxly98zqf5qb5j37p9rexbt.webp",
          "/uploads/products/ccxly98zqf5qb5j37p9rexbt.webp"
        ],
        categoryId: "4",
        colorId: "6",
        storeId: store2.id,
        userId: user.id
      },
      {
        id: "4",
        title: "Демон",
        description: `Материал: 2х нитка пенье 240 гр/м²
Состав: 95% хлопок 5% лайкра
Нанесение: Шелкография
Крой: Оверсайз
Рост моделей: 183/160
Размер на моделях: M/S

Отправляем в течение недели с момента заказа`,
        price: 3100,
        images: [
          "/uploads/products/sb19mfjhi8ddhgsmbgusy8p6.webp",
          "/uploads/products/ksqqkuot4bz9yyd0ysekom9o.webp",
          "/uploads/products/t7g7j21gixzrx3ojkj3xkhl2.webp"
        ],
        categoryId: "4",
        colorId: "5",
        storeId: store2.id
      },
      {
        id: "5",
        title: "Отсо",
        description: `Материал: футер 3х нитка 330 гр/м²
Состав: 80% хлопок 20% полиэстер
Печать: ШелкографияКрой: Оверсайз

Отправляем в течение недели с момента заказа`,
        price: 5000,
        images: [
          "/uploads/products/b0i8af2i87ahhgflerc536n3.webp",
          "/uploads/products/cq2a6u6w5xxy6z6sypia3yx0.webp",
          "/uploads/products/ywt67xma5ian3u7sm4lxktsl.webp"
        ],
        categoryId: "2",
        colorId: "4",
        storeId: store1.id
      },
      {
        id: "6",
        title: "Отсо",
        description: `Материал: футер 3х нитка 330 гр/м²
Состав: 80% хлопок 20% полиэстер
Печать: ШелкографияКрой: Оверсайз

Отправляем в течение недели с момента заказа`,
        price: 3900,
        images: [
          "/uploads/products/u84y7wlv8mijfvgzvjjo3kjr.webp",
          "/uploads/products/ehq063g3jgpbhlrxf86ab02c.webp",
          "/uploads/products/aw9627j34w0xiqtpy4ggtjem.webp"
        ],
        categoryId: "3",
        colorId: "4",
        storeId: store1.id
      },
      {
        id: "7",
        title: "Мне хорошо",
        description: `Материал: 2х нитка пенье 240 гр/м²
Состав: 95% хлопок 5% лайкра
Печать: Вышивка
Крой: Оверсайз

Отправляем в течение недели с момента заказа`,
        price: 3200,
        images: [
          "/uploads/products/u84y7wlv8mijfvgzvjjo3kjr.webp",
          "/uploads/products/ehq063g3jgpbhlrxf86ab02c.webp",
          "/uploads/products/aw9627j34w0xiqtpy4ggtjem.webp"
        ],
        categoryId: "4",
        colorId: "5",
        storeId: store2.id
      },
      {
        id: "8",
        title: "Голова",
        description: `Материал: 2х нитка пенье 240 гр/м²
Состав: 95% хлопок 5% лайкра
Печать: Прямая печать
Крой: Оверсайз

Отправляем в течение недели с момента заказа`,
        price: 3600,
        images: [
          "/uploads/products/xgpue4k57pvyvwcit2ya2fsv.webp",
          "/uploads/products/sd9d6i06p6eylwcpqadge1d2.webp",
          "/uploads/products/v1zvoe5my0syakdmlomkfqcl.webp"
        ],
        categoryId: "1",
        colorId: "3",
        storeId: store1.id,
        userId: user.id
      },
      {
        id: "9",
        title: "Этапы идеальных разрушений",
        description: `Материал: 2х нитка пенье 240 гр/м²
Состав: 95% хлопок 5% лайкра
Печать: Прямая печать
Крой: Оверсайз

Отправляем в течение недели с момента заказа`,
        price: 3000,
        images: [
          "/uploads/products/es2j05j4kbxj8bm30flyt9hm.webp",
          "/uploads/products/pqp5r9oalh1tkxj4ibkwmb50.webp"
        ],
        categoryId: "4",
        colorId: "5",
        storeId: store2.id
      },
      {
        id: "10",
        title: "Мужья на час",
        description: `Материал: 2х нитка пенье 240 гр/м²
Состав: 95% хлопок 5% лайкра
Печать: Прямая печать
Крой: Оверсайз

Отправляем в течение недели с момента заказа`,
        price: 2400,
        images: ["/uploads/products/htfnd5wl0crr1mf13azsvnx0.webp"],
        categoryId: "4",
        colorId: "5",
        storeId: store2.id
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
      },
      {
        text: "Очень круто!!!",
        rating: 5,
        userId: user.id,
        productId: "3",
        storeId: store2.id
      },
      {
        text: "Сыну очень понравилось)",
        rating: 5,
        userId: user.id,
        productId: "7",
        storeId: store2.id
      },
      {
        text: "Нитка торчала!!! Но так норм)))",
        rating: 4,
        userId: user.id,
        productId: "6",
        storeId: store1.id
      },
      {
        text: "Пришла другая футболка(((",
        rating: 2,
        userId: user.id,
        productId: "10",
        storeId: store2.id
      },
      {
        text: "Спасибо, но цвет пришел другой, не тот который хотел ;(",
        rating: 4,
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
      },
      {
        id: "2",
        status: EnumOrderStatus.PAYED,
        total: 3200,
        userId: user.id
      },
      {
        id: "3",
        status: EnumOrderStatus.PAYED,
        total: 6000,
        userId: user.id
      },
      {
        id: "4",
        status: EnumOrderStatus.PAYED,
        total: 7100,
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
      },
      {
        quantity: 1,
        price: 3200,
        orderId: "2",
        productId: "3",
        storeId: store2.id
      },
      {
        quantity: 1,
        price: 3600,
        orderId: "3",
        productId: "8",
        storeId: store1.id
      },
      {
        quantity: 1,
        price: 2400,
        orderId: "3",
        productId: "10",
        storeId: store2.id
      },
      {
        quantity: 1,
        price: 3900,
        orderId: "4",
        productId: "6",
        storeId: store1.id
      },
      {
        quantity: 1,
        price: 3200,
        orderId: "4",
        productId: "7",
        storeId: store2.id
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
