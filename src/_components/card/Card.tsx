import { Box, Inset, Card as RCard } from '@radix-ui/themes';

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}

const Card = ({ imageAlt, children, imageSrc }: CardProps) => (
  <Box>
    <RCard>
      <Inset>
        <img src={imageSrc} alt={imageAlt} className="w-full" />
        <div className="p-4">{children}</div>
      </Inset>
    </RCard>
  </Box>
);

export default Card;
