interface LogoWrapperProps {
  children?: React.ReactNode;
}

const LogoWrapper = ({ children }: LogoWrapperProps) => {
  return <div className="flex w-1/8 px-4 h-12 justify-center">{children}</div>;
};

export default LogoWrapper;
