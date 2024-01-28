'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

export const BackButton = ({ href, lable }: { href: string; lable: string }) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{lable}</Link>
    </Button>
  );
};
