import { type Project } from '@/actions/project.actions';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => (
  <Section id="projects">
    <SectionHeading
      title="Private projects"
      description="Independent work directly with clients."
    />
    <div className="grid gap-[0.9rem] min-[860px]:grid-cols-2">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </Section>
);

export default Projects;
