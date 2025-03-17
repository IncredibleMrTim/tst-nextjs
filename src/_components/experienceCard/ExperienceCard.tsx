import { ExperienceModal } from '@/_model/experienceModal';
import { Card } from '@radix-ui/themes';
import moment from 'moment';

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
        {`${moment(experience.startDate).format('MMM YY')} - `}
        {moment(experience.endDate).format('MMM YY')}
      </p>

      <p className="whitespace-pre-line mb-8">{experience.description}</p>

      <div className="">
        <h4>Tech Stack</h4>
        <p className="!text-sm divide-gray-300 divide-x divider-w-8 whitespace-nowrap ">
          {experience.skills
            .sort((a, b) => a.order - b.order)
            .map((skill, i) => (
              <span
                key={skill.order}
                className={`text-gray-500 pr-1 ${i !== 0 ? 'pl-1' : ''}`}
              >
                {skill.name}
              </span>
            ))}
        </p>
      </div>
    </Card>
  );
};

export default ExperienceCard;
