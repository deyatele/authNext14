import { auth } from '@/auth';

export const currenUser = async () => {
  const session = await auth();
  return session?.user;
};
