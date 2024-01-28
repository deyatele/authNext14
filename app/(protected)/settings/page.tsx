'use client';
import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useCurrentUser } from '@/hooks/use-current-user';
import { settings } from '@/actions/settings';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SettingsSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import { UserRole } from '@prisma/client';

const SettingPage = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('Что-то пошло не так!'));
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Настройки</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="..." disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Адрес эл.почты</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="test@test.ru" disabled={isPending} type="email" />
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
                          <Input {...field} placeholder="******" disabled={isPending} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Новый пароль</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="******" disabled={isPending} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Роль</FormLabel>
                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберете роль" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Администратор</SelectItem>
                        <SelectItem value={UserRole.USER}>Пользователь</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Двухфакторная аунтификация</FormLabel>
                          <FormDescription>Можно включить двухфакторную аунтификацию</FormDescription>
                        </div>
                        <FormControl>
                          <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button disabled={isPending} type="submit">Сохранить</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingPage;
