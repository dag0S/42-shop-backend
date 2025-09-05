import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({
    message: "Почта обязательна"
  })
  @IsEmail()
  email: string;

  @IsString({
    message: "Пароль обазателен"
  })
  @MinLength(6, { message: "Пароль должен содеражить не менее 6 символов" })
  password: string;
}
