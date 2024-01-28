'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import { currenUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVereficationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/token';
import { SettingsSchema } from '@/schemas';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currenUser();

  if (!user) {
    return { error: 'Пользователь не зарегистрирован!' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: 'Пользователь не зарегистрирован!' };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id)
      return { error: 'Электронный адрес занят и он принадлежит другому пользователю!' };

    const verificationToken = await generateVerificationToken(values.email);

    await sendVereficationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Вам отправлено письмо для подтверждения электронной почты!' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!passwordMatch) return { error: 'Не верный пароль!' };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
    
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: 'Настройки обновлены!' };
};
