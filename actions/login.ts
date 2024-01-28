'use server';

import { signIn } from '@/auth';
import { getTwoFactorTokenByEmail } from '@/data/two-factor';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendVereficationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/token';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?:string | null ) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Не заполнены поля ввода!' };
  }
  const { email, password, code } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: 'Не верная электронная почта или пароль!' };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVereficationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Вам отправлено письмо на электронную почту для входа!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) return { error: 'Не верный код!' };

      if (twoFactorToken.token !== code) return { error: 'Не верный код!' };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) return { error: 'Срок действия кода вышло!' };

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Не верный логин или пароль!' };
        default: {
          error: 'Что-то пошло не так!';
        }
      }
    }

    throw error;
  }
};
