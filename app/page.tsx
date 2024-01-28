import { Poppins } from 'next/font/google';
import { cn } from './../lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
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
          <h1 className={cn('sm:text-6xl text-3xl font-semibolt text-white drop-shadow-md', font.className)}> Авторизация</h1>
        </div>
        <p className="text-white sm:text-lg text-sm pb-5">Сервис простой авторизации</p>
      </div>
      <LoginButton mode='modal' asChild>
        <Button variant="secondary" size={'lg'}>
          Войти
        </Button>
      </LoginButton>
    </main>
  );
}
