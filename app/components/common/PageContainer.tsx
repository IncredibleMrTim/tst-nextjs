import { Box, type BoxProps } from '@radix-ui/themes';
import { type ReactNode } from 'react';

interface PageContainerProps {
  children?: ReactNode | string;
}

const PageContainer = ({
  children,
  ...props
}: PageContainerProps & BoxProps) => {
  return (
    <Box className="!pt-2 md:!pt-8 px-4" {...props}>
      {children}
    </Box>
  );
};

export default PageContainer;
