# 42 BROTHERS (Маркетплейс)

> Маркетплейс для стримеров 42-комьюнити, где продавцы могут создавать свои магазины и выкладывать товары. Покупатели могут добавлять товары в избранное и корзину, оплачивать через сервис ЮKassa, оставлять отзывы на товары.

---

## Демо

🔗 **Live Demo:** null
<br/>
🔗 **Frontend (GitHub):** [https://github.com/dag0S/42-shop-frontend](https://github.com/dag0S/42-shop-frontend)

---

## Стек технологий

**NestJS** | **TypeScript** | **Prisma ORM** | **PassportJS** | **JWT + Google Auth 2.0 + Yandex Auth** | **ЮKassa** | **PostgreSQL** | **Argon2** | **ESLint + Prettier**

---

## Функционал

- Авторизация / Регистрация пользователей (JWT, Google Auth, Yandex Auth);
- Защищенные роуты;
- Спроектирована База Данных PostgreSQL с помощью Prisma ORM;
- Реализованы сущности пользателя, товара, категории, цвета, статистики, магазина, заказа.
- Просмотр, создание, редактирование, удаление и фильтрация данных;
- Интеграция с ЮKassa;

## Эндпоинты (API)

|  Метод   |                  URL                  |                  Описание                   |
| :------: | :-----------------------------------: | :-----------------------------------------: |
|  `POST`  |           `/auth/register`            |                 Регистрация                 |
|  `POST`  |             `/auth/login`             |               Вход в аккаунт                |
|  `POST`  |            `/auth/refresh`            |           Обновление refreshToken           |
|  `POST`  |            `/auth/logout`             |              Выход из аккаунта              |
|  `GET`   |           `/users/profile`            |       Получение профиля пользователя        |
|  `POST`  | `/users/profile/favorites/:productId` | Добавление/удаление товара в/из избранного  |
|  `GET`   |          `/stores/:storeId`           |       Получение магазина по `storeId`       |
|  `POST`  |               `/stores`               |              Создание магазина              |
|  `PUT`   |          `/stores/:storeId`           |           Редактирование магазина           |
| `DELETE` |          `/stores/:storeId`           |              Удаление магазина              |
|  `GET`   |      `statistics/main/:storeId`       |        Получение главной статистики         |
|  `GET`   |     `statistics/middle/:storeId`      |        Получение средней статистики         |
|  `GET`   |              `/products`              |           Получение всех товаров            |
|  `GET`   |       `/products/most-popular`        |    Получение 6 самых продаваемых товаров    |
|  `GET`   |        `/products/similar/:id`        |          Получение похожих товаров          |
|  `GET`   |         `/products/by-id/:id`         |          Получение товара по `id`           |
|  `GET`   |    `/products/by-storeId/:storeId`    |   Получение товаров магазина по `storeId`   |
|  `GET`   | `/products/by-categoryId/:categoryId` | Получение товаров категории по `categoryId` |
|  `POST`  |         `/products/:storeId`          |               Создание товара               |
|  `PUT`   |        `/products/:productId`         |            Редактирование товара            |
| `DELETE` |        `/products/:productId`         |               Удаление товара               |
|  `GET`   |      `/colors/get-all/:storeId`       |   Получение цветов магазина по `storeId`    |
|  `GET`   |          `/colors/:colorId`           |        Получение цвета по `colorId`         |
|  `POST`  |          `/colors/:storeId`           |               Создание цвета                |
|  `PUT`   |          `/colors/:colorId`           |            Редактирование цвета             |
| `DELETE` |          `/colors/:colorId`           |               Удаление цвета                |
|  `GET`   |    `/categories/get-all/:storeId`     |  Получение категорий магазина по `storeId`  |
|  `GET`   |       `/categories/:categoryId`       |     Получение категории по `categoryId`     |
|  `POST`  |        `/categories/:storeId`         |             Создание категории              |
|  `PUT`   |       `/categories/:categoryId`       |          Редактирование категории           |
| `DELETE` |       `/categories/:categoryId`       |             Удаление категории              |
|  `GET`   |    `/reviews/by-storeId/:storeId`     |   Получение отзывов магазина по `storeId`   |
|  `POST`  |         `/reviews/:productId`         |               Создание отзыва               |
| `DELETE` |         `/reviews/:reviewId`          |               Удаление отзыва               |
|  `POST`  |               `/files`                |              Скачивание файла               |
|  `POST`  |            `/orders/place`            |               Создание заказа               |

---

## Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/dag0S/42-shop-backend.git
cd 42-shop-backend

# Устанавить зависимости
npm install

# Запуск в DEV моде
npm run start:dev

# Сборка проекта
npm run build

# Запуск в PRODUCTION моде
npm run start:prod
```
