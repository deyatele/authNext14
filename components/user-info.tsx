import { ExtendedUser } from '@/types/next-auth';
import { Card, CardHeader, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface UserInfoProps {
  user?: ExtendedUser;
  lable: string;
}

export const UserInfo = ({ user, lable }: UserInfoProps) => {
  return (
    <Card className="sm:w-[600px] w-[360px] shadow-md">
      <CardHeader>
        <p className="text-2xl fonst-semibold text-center">{lable}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="test-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.id}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="test-sm font-medium">Имя</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.name}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="test-sm font-medium">Эл.почта</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.email}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="test-sm font-medium">Роль</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.role}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="test-sm font-medium">Двухфакторная аунтификация</p>
          <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
