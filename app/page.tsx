import { Poppins } from 'next/font/google';
import { cn } from './../lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
import Image from 'next/image';
import { LockEmoji } from '@/components/ui/lock-emoji';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <div className="flex justify-center items-center gap-3">
        <LockEmoji />
          <h1 className={cn('text-6xl font-semibolt text-white drop-shadow-md', font.className)}> Авторизация</h1>
        </div>
        <p className="text-white text-lg pb-5">Сервис простой авторизации</p>
      </div>
      <LoginButton mode='modal' asChild>
        <Button variant="secondary" size={'lg'}>
          Войти
        </Button>
      </LoginButton>
    </main>
  );
}
