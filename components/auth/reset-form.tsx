'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { CardWrapper } from './card-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ResetSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { reset } from '@/actions/reset';
import { useState, useTransition } from 'react';

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLable="Забыли пароль?"
      backButtonLabel="Вернуться на страницу входа"
      backButtonHref="/auth/login"
      title="Сброс пароля"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
