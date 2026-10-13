import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Section = ({ id, className, children }: SectionProps) => (
  <section id={id} className={cn('pt-4 pb-[clamp(3rem,6vw,5rem)]', className)}>
    <div className="mx-auto max-w-6xl px-gutter">{children}</div>
  </section>
);

export default Section;
