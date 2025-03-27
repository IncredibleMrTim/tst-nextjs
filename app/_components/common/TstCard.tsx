import { Card, type CardProps } from '@radix-ui/themes';
import { ReactNode } from 'react';

const TstCard = ({
  children,
  ...props
}: { children?: ReactNode } & CardProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-md p-4" {...props}>
      {children}
    </Card>
  );
};

export default TstCard;
