interface LogoWrapperProps {
  children?: React.ReactNode;
}

const LogoWrapper = ({ children }: LogoWrapperProps) => {
  return <div className="flex w-1/7 px-4">{children}</div>;
};

export default LogoWrapper;
