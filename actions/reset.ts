'use server';

import { z } from 'zod';
import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { generatePassworResetToken } from '@/lib/token';
import { sendPassworResetEmail } from '@/lib/mail';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFilds = ResetSchema.safeParse(values);

  if (!validatedFilds.success) return { error: 'Некоректный пароль' };

  const { email } = validatedFilds.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: 'Адрес электронной почты не найден!' };

  const passwordResetToken = await generatePassworResetToken(email);

  await sendPassworResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: 'Вам было отправлено письмо для сброса пароля!' };
};
