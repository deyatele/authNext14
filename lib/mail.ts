import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL
export const sendTwoFactorTokenEmail = async (email:string,token:string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Двухфакторное подтверждение",
        html:`<p>Ваш код: ${token}</p>`
    })
}

export const sendVereficationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "mail@auth-nextjs14.site",
        to: email,
        subject: "Подтвердите свой адрес электронной почты и ввойдите в систему",
        html:`<p>Перейти <a href='${confirmLink}'>${confirmLink}</a> для входа.</p>`
    })
};

export const sendPassworResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "mail@auth-nextjs14.site",
        to: email,
        subject: "Ссылка для сброса пароля",
        html:`<p>Перейдите по ссылки или скопируйте и вставьте в браузер ссылку <a href='${resetLink}'>${resetLink}</a> чтобы сбросить пароль.</p>`
    })
};
