'use server'

import { getPasswordResetTokenByToken } from "@/data/reset"
import { getUserByEmail } from "@/data/user"
import { NewPasswordSchema } from "@/schemas"
import { z } from "zod"
import  bcrypt from 'bcryptjs';
import { db } from "@/lib/db"

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
    ) => {
        if (!token) return { error: 'Страница устарела или не правильный адрес!'}

        const validatedFilds = NewPasswordSchema.safeParse(values)

        if (!validatedFilds.success) return {error: 'Пароль некорректный!'}

        const { password } = validatedFilds.data;

        const existingToken = await getPasswordResetTokenByToken(token)

        if (!existingToken) return { error: 'Страница устарела или не правильный адрес!'}

        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) return { error: 'Слишком много прошло времени, запросите заново!'}

        const existingUser = await getUserByEmail(existingToken.email)

        if (!existingUser) return { error: 'Адреса электронной почты не существует.'}

        const hashPassword = await bcrypt.hash(password, 10)

        await db.user.update({
            where: { id: existingUser.id},
            data: {password: hashPassword}
        })

        await db.passwordResetToken.delete({
            where: { id: existingToken.id}
        })

        return { success: 'Пароль был изменен!'}
    }