import { type ExperienceWithSkills } from '@/actions/experience.actions';
import { Card } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '@/utils/dateUtils';

interface ExperienceCardProps {
  experience: ExperienceWithSkills;
  children?: React.ReactNode;
}

const ExperienceCard = ({ experience, children }: ExperienceCardProps) => {
  return (
    <Card className="mb-8" variant="classic">
      <div className="flex justify-between items-top w-full">
        <div>
          <h2 className="text-left">
            {experience.role} - {experience.company}
          </h2>
          <p className="italic mb-8 !text-sm">
            {`${formatDate(experience.fromDate)} - `}
            {experience.toDate && new Date(experience.toDate) < new Date()
              ? formatDate(experience.toDate)
              : 'present'}
          </p>
        </div>
        <div className="flex self-start w-36">{children}</div>
      </div>

      <div className="mb-8 prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside space-y-2 text-gray-700" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="ml-2" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-2 text-gray-700" {...props} />
            )
          }}
        >
          {experience.description}
        </ReactMarkdown>
      </div>

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
