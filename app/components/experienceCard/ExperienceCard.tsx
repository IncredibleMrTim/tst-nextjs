import { type ExperienceWithSkills } from '@/actions/experience.actions';
import { Card } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '@/utils/dateUtils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
interface ExperienceCardProps {
  experience: ExperienceWithSkills;
  children?: React.ReactNode;
  showDetailed?: boolean;
}

const ExperienceCard = ({
  experience,
  showDetailed,
  children
}: ExperienceCardProps) => {
  return (
    <div className="p-4 mb-8 border border-gray-200 rounded shadow">
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
        <h4 className="pb-2">Summary</h4>
        <ReactMarkdown
          components={{
            ul: ({ node, ...props }) => (
              <ul
                className="list-disc list-inside space-y-2 text-gray-700"
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li className="text-sm ml-2" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-2 text-gray-700" {...props} />
            )
          }}
        >
          {experience.summary}
        </ReactMarkdown>
      </div>

      {experience.description && (
        <div className=" pb-4">
          <Accordion
            key={`${experience.id}-${showDetailed}`}
            type="single"
            collapsible
            defaultValue={showDetailed ? 'Details' : ''}
          >
            <AccordionItem
              value="Details"
              className="border border-gray-200 rounded"
            >
              <AccordionTrigger className="p-4">
                <h4>Detailed Role Description</h4>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="mb-2 text-gray-700" {...props} />
                    )
                  }}
                >
                  {experience.description}
                </ReactMarkdown>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      <div className="p-4 border border-gray-200 rounded">
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
    </div>
  );
};

export default ExperienceCard;
