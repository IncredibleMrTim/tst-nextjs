import { Box } from '@radix-ui/themes';

interface PageHeaderProps {
  children?: React.ReactNode | string;
}

const PageHeader = ({ children, ...props }: PageHeaderProps) => {
  return (
    <Box
      className="flex relative bg-red-700 w-full p-4 rounded-md text-white shadow-md mt-4 md:mt-8"
      {...props}
    >
      {typeof children === 'string' ? (
        <h2 className="flex justify-start">{children}</h2>
      ) : (
        children
      )}
    </Box>
  );
};
export default PageHeader;
