'use server';

import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVereficationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Не заполнены поля ввода!' };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Этот электронный адрес уже используется!' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email)
  await sendVereficationEmail(email,verificationToken.token)

  return { success: 'Вам отправлено письмо на электронную почту для входа!' };
};
