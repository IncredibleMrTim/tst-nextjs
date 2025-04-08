import { Card as RCard, type CardProps } from '@radix-ui/themes';
import { ReactNode } from 'react';

const Card = ({ children, ...props }: { children?: ReactNode } & CardProps) => {
  return (
    <RCard className="bg-white rounded-lg shadow-md p-4" {...props}>
      {children}
    </RCard>
  );
};

export default Card;
