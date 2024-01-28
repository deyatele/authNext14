'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { CardWrapper } from './card-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { LoginSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Адрес электронной почты уже существует, попробуйте зайти под другим провайдером.'
      : '';
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [show2F, setShow2F] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShow2F(true);
          }
        })
        .catch(() => setError('Что-то пошло не так!'));
    });
  };

  return (
    <CardWrapper
      headerLable="Добро пожаловать"
      backButtonLabel="У меня нет аккаунта"
      backButtonHref="/auth/register"
      showSocial
      title="Вход"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {show2F && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Введите код из письма</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="123456" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!show2F && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Электронная почта</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="mail@email.ru" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="******" type="password" />
                      </FormControl>
                      <Button size="sm" variant="link" asChild className="px-0 font-normal">
                        <Link href="/auth/reset">Забыли пароль?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
           {show2F ? 'Подтвердить':'Войти'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
