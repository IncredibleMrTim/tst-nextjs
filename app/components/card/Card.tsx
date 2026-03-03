'use client';

import { Box, Inset, Card as RCard } from '@radix-ui/themes';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  href?: string;
  children: React.ReactNode;
}

const LinkWrapper = (children: React.ReactNode, href?: string) => {
  return href ? (
    <Link href={href} prefetch>
      {children}
    </Link>
  ) : (
    <div>{children}</div>
  );
};

const Card = ({ imageAlt, children, imageSrc, href }: CardProps) => (
  <Box>
    <RCard>
      <Inset>
        {LinkWrapper(
          <>
            <div className="relative w-full h-64">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
            </div>
            <div className="p-4">{children}</div>
          </>,
          href
        )}
      </Inset>
    </RCard>
  </Box>
);

export default Card;
