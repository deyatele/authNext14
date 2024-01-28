'use client';

import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';

const AdminPage = () => {
  
  
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Администратор</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Вам доступна эта страница" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Действие только для администраторов</p>
        <Button>Тест</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Действие только для администраторов сервера</p>
        <Button>Тест</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
