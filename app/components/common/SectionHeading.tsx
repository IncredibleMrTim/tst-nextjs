interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const SectionHeading = ({
  title,
  description,
  className = 'mb-8'
}: SectionHeadingProps) => (
  <div
    className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-2 ${className}`}
  >
    <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] leading-none font-bold tracking-[-0.018em]">
      {title}
    </h2>
    {description && (
      <p className="max-w-[26rem] text-[0.98rem] text-muted-foreground">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
