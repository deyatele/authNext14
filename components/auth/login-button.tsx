'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './login-form';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };
  if (mode === 'modal') {
    return (
      <Dialog >
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-1 w-auto bg-transparent">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
