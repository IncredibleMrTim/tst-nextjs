'use client';

import { Box, Inset, Card as RCard } from '@radix-ui/themes';
import Link from 'next/link';

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  href?: string;
  children: React.ReactNode;
}

const LinkWrapper = (children: React.ReactNode, href?: string) => {
  return href ? <Link href={href}>{children}</Link> : <div>{children}</div>;
};

const Card = ({ imageAlt, children, imageSrc, href }: CardProps) => (
  <Box>
    <RCard>
      <Inset>
        {LinkWrapper(
          <>
            <img src={imageSrc} alt={imageAlt} className="w-full" />
            <div className="p-4">{children}</div>
          </>,
          href
        )}
      </Inset>
    </RCard>
  </Box>
);

export default Card;
