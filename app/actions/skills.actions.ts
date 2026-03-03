'use server';

import { $Enums, Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';
import { skillTypeMap } from '@/lib/skillTypeMap';

type Skill = Prisma.SkillGetPayload<{}>;

export interface SkillCategory {
  type: $Enums.SkillType;
  title: string;
  skills: Skill[];
}

const _getSkills = async (): Promise<SkillCategory[]> => {
  const allSkills = await prisma.skill.findMany({
    orderBy: [{ type: 'asc' }, { order: 'asc' }]
  });

  // Group skills by type
  const groupedByType = allSkills.reduce(
    (acc, skill) => {
      const existing = acc.find((cat) => cat.type === skill.type);
      if (existing) {
        existing.skills.push(skill);
      } else {
        acc.push({
          type: skill.type,
          title: skillTypeMap[skill.type].label,
          skills: [skill]
        });
      }
      return acc;
    },
    [] as SkillCategory[]
  );

  return groupedByType;
};

export const getSkills = unstable_cache(
  _getSkills,
  ['skills'],
  { revalidate: 86400, tags: ['skills'] }
);
