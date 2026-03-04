import Image from 'next/image';

interface PageHeaderProps {
  children?: React.ReactNode | string;
  className?: string;
  title?: string;
  showBorder?: boolean;
  showImage?: boolean;
}

const PageHeader = ({
  children,
  title,
  showBorder,
  showImage = true,
  className
}: PageHeaderProps) => {
  return (
    <div
      className={`flex w-full  border-b border-gray-200 md:border-b-0 md:bg-gradient-to-br from-base from-30%  to-gray-100 rounded  ${className}`}
    >
      <div className="flex gap-4 p-4">
        {showImage && (
          <Image
            src="/images/profile-sm.jpg"
            width="144"
            height="166"
            alt="Profile Picture"
            priority={true}
            className="!hidden rounded-md shadow-md md:!flex"
          />
        )}

        <div className="flex flex-col gap-2">
          <h1 className="flex justify-left !text-3xl">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};
export default PageHeader;
