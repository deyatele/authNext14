'use client';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { BackButton } from './back-button';
import { Header } from './header';
import Social from './social';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLable: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  title?: string;
}

export const CardWrapper = ({
  children,
  headerLable,
  backButtonLabel,
  backButtonHref,
  showSocial,
  title,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header lable={headerLable} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton lable={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
