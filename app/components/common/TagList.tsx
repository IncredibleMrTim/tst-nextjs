import { cn } from '@/lib/utils';

interface TagListProps {
  tags: string[];
  label: string;
  /** Tag to emphasise, e.g. the skill currently filtering the roles. */
  highlightedTag?: string | null;
}

const TagList = ({ tags, label, highlightedTag }: TagListProps) => (
  <ul aria-label={label} className="flex flex-wrap gap-[0.4rem]">
    {tags.map(tag => (
      <li
        key={tag}
        className={cn(
          'rounded-full bg-brand-2/[0.12] px-[0.65rem] py-[0.12rem] text-[0.8rem] text-brand-soft',
          tag === highlightedTag &&
            'bg-brand-gradient font-semibold text-on-brand'
        )}
      >
        {tag}
      </li>
    ))}
  </ul>
);

export default TagList;
