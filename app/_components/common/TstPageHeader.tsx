import { Box } from '@radix-ui/themes';

interface TstPageHeaderProps {
  children?: React.ReactNode | string;
}

const TstPageHeader = ({ children, ...props }: TstPageHeaderProps) => {
  return (
    <Box
      className="flex relative bg-red-700 w-full p-4 rounded-md text-white shadow-md mt-4 md:mt-8"
      {...props}
    >
      {typeof children === 'string' ? (
        <h2 className="flex justify-left justify-start">{children}</h2>
      ) : (
        children
      )}
    </Box>
  );
};
export default TstPageHeader;
