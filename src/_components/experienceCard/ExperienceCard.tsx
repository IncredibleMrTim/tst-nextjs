import { Card } from '@radix-ui/themes';
import moment from 'moment';

interface ExperienceCardProps {
  company: string;
  jobType: string;
  title: string;
  fromDate: Date | string | undefined;
  toDate: Date | string | undefined;
  description: string;
  techStack?: string[];
}

const ExperienceCard = ({
  title,
  description,
  fromDate,
  toDate,
  techStack,
  company,
  jobType
}: ExperienceCardProps) => {
  return (
    <Card>
      <h2 className="text-left pb-0">
        {title} - {company}
      </h2>

      <p className="italic mb-8 !text-sm">
        {`from: ${moment(fromDate).format('MMM YY')}`}
        {`to: ${moment(toDate).format('MMM YY')}`}

        {jobType && <span> ({jobType})</span>}
      </p>
      <p className="mb-8">{description}</p>
      <h3 className="text-left pb-0">{techStack}</h3>
      <p className="!text-sm">
        {Array.isArray(techStack) && techStack.toString().replace(/,/g, ', ')}
      </p>
    </Card>
  );
};

export default ExperienceCard;
