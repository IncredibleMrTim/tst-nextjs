import { ArrowUpRight } from 'lucide-react';

import { type Project } from '@/actions/project.actions';
import TagList from '@/components/common/TagList';
import { Button } from '@/components/ui/button';
import { formatDateRange } from '@/utils/dateUtils';
import { getSummaryBullets } from '@/utils/experienceUtils';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className="tile p-6">
    <h3 className="mb-[0.15rem] text-[1.3rem] font-semibold tracking-[-0.015em]">
      {project.name}
    </h3>
    <p className="mb-[0.9rem] text-[0.88rem] text-brand-1">
      {project.role}
      {project.fromDate &&
        ` · ${formatDateRange(project.fromDate, project.toDate)}`}
    </p>
    <ul className="mb-4 grid list-disc gap-[0.3rem] pl-[1.1rem] text-[0.93rem] text-foreground/80">
      {getSummaryBullets(project.summary).map(bullet => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
    {project.technologies.length > 0 && (
      <TagList tags={project.technologies} label="Technologies" />
    )}
    {project.url && (
      <p className="mt-[1.1rem]">
        <Button asChild variant="inline" size="bare">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            Visit site <ArrowUpRight />
          </a>
        </Button>
      </p>
    )}
  </article>
);

export default ProjectCard;
