import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { LockEmoji } from '../ui/lock-emoji';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  lable: string;
  title?: string;
}

export const Header = ({ lable, title = 'Авторизация' }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex justify-center items-center gap-3">
        <LockEmoji width={40} height={40} />
        <h1 className={cn('text-3xl font-semibold', font.className)}> {title}</h1>
      </div>
      <p className="text-muted-foreground text-sm text-center">{lable}</p>
    </div>
  );
};
