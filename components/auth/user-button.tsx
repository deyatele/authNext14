'use client';

import { FaUser } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from '../ui/dropdown-menu';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from './logout-button';
import { ExitIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const UserButton = () => {
  const pathname = usePathname();
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 flex flex-col" align="end">
        <div className='flex flex-col sm:hidden'>
          <DropdownMenuItem>
            <Link href="/server">Сервер</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/client">Клиент</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/admin">Админ</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">Настройки</Link>
          </DropdownMenuItem>
        </div>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Выход
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
