import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;

      return true;
    },
    {
      message: 'Поле обязательное для заполнения!',
      path: ['newPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;

      return true;
    },
    {
      message: 'Поле обязательное для заполнения!',
      path: ['password'],
    },
  );

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Некоректный адрес электронной почты' }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Введите пароль не менее 6 символов',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Некоректный адрес электронной почты' }),
  password: z.string().min(1, {
    message: 'Введите пароль',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Некоректный адрес электронной почты' }),
  password: z.string().min(6, {
    message: 'Введите пароль не менее 6 символов',
  }),
  name: z.string().min(3, {
    message: 'Длина имени не менее 3-х символов',
  }),
});
