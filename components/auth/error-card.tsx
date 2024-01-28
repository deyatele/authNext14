import { BackButton } from './back-button';
import { Header } from './header';
import { Card, CardFooter, CardHeader } from '../ui/card';
import { CardWrapper } from './card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLable="Упс! Что-то пошло не так!"
      backButtonLabel="Вернутся обратно"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" width={50} height={50} />
      </div>
    </CardWrapper>
  );
};
