import { cn } from '@/lib/utils';
import { getInitials } from '@/utils/experienceUtils';

interface CompanyLogoProps {
  /** Uploaded logo URL; initials are shown when missing. */
  logoUrl: string | null;
  company: string;
  className?: string;
}

const tileClassName =
  'grid h-[3.7rem] w-[7.4rem] flex-none grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] place-items-center overflow-hidden rounded-[12px] px-[0.6rem] py-[0.45rem] max-[560px]:h-[3.2rem] max-[560px]:w-24 max-[560px]:px-2 max-[560px]:py-[0.4rem]';

const CompanyLogo = ({ logoUrl, company, className }: CompanyLogoProps) => {
  if (!logoUrl) {
    return (
      <span
        aria-hidden
        className={cn(
          tileClassName,
          'bg-brand-2/[0.12] text-[1.15rem] font-bold tracking-[0.02em] text-brand-soft ring-1 ring-brand-2/25',
          className
        )}
      >
        {getInitials(company)}
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        tileClassName,
        'bg-white ring-1 ring-line-strong',
        className
      )}
    >
      {/* Sanity's CDN already resizes and re-encodes, so next/image would only add a second pass. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoUrl}
        alt=""
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-contain"
      />
    </span>
  );
};

export default CompanyLogo;
