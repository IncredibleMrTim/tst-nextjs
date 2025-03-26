import { type ExperienceModal } from '@api/experienceApi';
import { Card } from '@radix-ui/themes';
import { formatDate } from '@utils/dateUtils';

interface ExperienceCardProps {
  experience: ExperienceModal;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <Card className="mb-8" variant="classic">
      <h2 className="text-left">
        {experience.role} - {experience.company}
      </h2>

      <p className="italic mb-8 !text-sm">
        {`${formatDate(experience.fromDate)} - `}
        {new Date(experience.toDate) < new Date()
          ? formatDate(experience.toDate)
          : 'present'}
      </p>

      <p className="whitespace-pre-line mb-8">{experience.description}</p>

      <div className="">
        <h4>Tech Stack</h4>
        <ul className="md:flex text-sm divide-gray-300 md:divide-x divider-w-8 whitespace-nowrap">
          {experience.skills
            .sort((a, b) => a.order - b.order)
            .map((skill, i) => (
              <li
                key={skill.order}
                className={`text-gray-500 pr-1 ${i !== 0 ? 'md:pl-1' : ''}`}
              >
                {skill.name}
              </li>
            ))}
        </ul>
      </div>
    </Card>
  );
};

export default ExperienceCard;
