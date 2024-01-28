'use client';

import { UserButton } from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary mt-5 flex justify-end items-center p-4 rounded-xl sm:w-[600px] w-[360px] sm:justify-between shadow-sm">
      <div className="hidden sm:flex sm:gap-x-2">
        <Button variant={pathname === '/server' ? 'default' : 'outline'} asChild>
          <Link href="/server">Сервер</Link>
        </Button>
        <Button variant={pathname === '/client' ? 'default' : 'outline'} asChild>
          <Link href="/client">Клиент</Link>
        </Button>
        <Button variant={pathname === '/admin' ? 'default' : 'outline'} asChild>
          <Link href="/admin">Админ</Link>
        </Button>
        <Button variant={pathname === '/settings' ? 'default' : 'outline'} asChild>
          <Link href="/settings">Настройки</Link>
        </Button>
      </div>
      <UserButton/>
    </nav>
  );
};
