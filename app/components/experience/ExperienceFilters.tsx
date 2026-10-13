import { Button } from '@/components/ui/button';
import { ALL_DECADES } from '@/store/experienceFilter/filterSlice';

interface ExperienceFiltersProps {
  decades: { decade: string; count: number }[];
  selectedDecade: string;
  areAllRolesOpen: boolean;
  onSelectDecade: (decade: string) => void;
  onToggleAllRoles: () => void;
}

const ExperienceFilters = ({
  decades,
  selectedDecade,
  areAllRolesOpen,
  onSelectDecade,
  onToggleAllRoles
}: ExperienceFiltersProps) => (
  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
    <div
      role="group"
      aria-label="Filter by decade"
      className="flex flex-wrap gap-[0.4rem]"
    >
      <Button
        variant="chip"
        size="chip"
        aria-pressed={selectedDecade === ALL_DECADES}
        onClick={() => onSelectDecade(ALL_DECADES)}
      >
        All roles
      </Button>
      {decades.map(({ decade, count }) => (
        <Button
          key={decade}
          variant="chip"
          size="chip"
          aria-pressed={selectedDecade === decade}
          onClick={() => onSelectDecade(decade)}
        >
          {decade} ({count})
        </Button>
      ))}
    </div>
    <Button variant="chip" size="chip" onClick={onToggleAllRoles}>
      {areAllRolesOpen ? 'Collapse all' : 'Expand all'}
    </Button>
  </div>
);

export default ExperienceFilters;
