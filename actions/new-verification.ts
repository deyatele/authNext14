'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from './../data/user';
import { getVereficationTokenByToken } from '@/data/verification-token';

export const newVerification = async (token: string) => {
  const existingToken = await getVereficationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Данный адрес страницы устарел или не существует!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Данный адрес страницы устарел или не существует!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Адрес электронной почты не найден!' };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Вход через электронную почту подтвержден!' };
};
