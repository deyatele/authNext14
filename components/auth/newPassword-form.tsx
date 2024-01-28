'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { CardWrapper } from './card-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { NewPasswordSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { newPassword } from '@/actions/new-password';
import { useState, useTransition } from 'react';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLable="Введите новый пароль"
      backButtonLabel="Вернуться на страницу входа"
      backButtonHref="/auth/login"
      title="Сброс пароля"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новый пароль</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Сброс пароля
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
