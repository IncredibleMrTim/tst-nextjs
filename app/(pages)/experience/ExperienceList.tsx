'use client';

import { useState } from 'react';
import ExperienceCard from '@/components/experienceCard/ExperienceCard';
import type { ExperienceWithSkills } from '@/actions/experience.actions';
import { Button } from '@/components/ui/button';
import { LuFileText, LuFileOutput } from 'react-icons/lu';

interface ExperienceListProps {
  data: ExperienceWithSkills[];
  imgMapping: Array<{
    index: number;
    company: string;
    image?: React.ReactNode;
  }>;
}

const ExperienceList = ({ data, imgMapping }: ExperienceListProps) => {
  const [showDetailed, setShowDetailed] = useState(false);

  return (
    <div className="flex flex-col ">
      <div className="flex w-full justify-start md:justify-end mb-2">
        <Button
          onClick={() => setShowDetailed(!showDetailed)}
          variant="outline"
        >
          {showDetailed ? 'Show Summary View' : 'Show Detailed View'}
          {showDetailed ? <LuFileOutput /> : <LuFileText />}
        </Button>
      </div>
      {data
        .sort((a, b) => b.order - a.order)
        .map((experience, idx) => (
          <ExperienceCard
            key={experience.company}
            experience={experience}
            showDetailed={showDetailed}
          >
            {imgMapping.find(img => img.index === idx)?.image ?? null}
          </ExperienceCard>
        ))}
    </div>
  );
};

export default ExperienceList;
