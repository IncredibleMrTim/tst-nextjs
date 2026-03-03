'use server';

import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

type Skill = Prisma.SkillGetPayload<{}>;

export interface ExperienceWithSkills {
  id: string;
  role: string;
  company: string;
  location: string;
  description: string | null;
  summary: string | null;
  fromDate: Date;
  toDate: Date | null;
  order: number;
  skills: Skill[];
  createdAt: Date;
  updatedAt: Date;
}

const _getExperiences = async (): Promise<ExperienceWithSkills[]> => {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' },
    include: {
      skills: {
        include: {
          skill: true
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  // Transform the data to extract skills from the junction table
  const transformedExperiences: ExperienceWithSkills[] = experiences.map(
    exp => ({
      id: exp.id,
      role: exp.role,
      company: exp.company,
      location: exp.location,
      description: exp.description,
      summary: exp.summary,
      fromDate: exp.fromDate,
      toDate: exp.toDate,
      order: exp.order,
      createdAt: exp.createdAt,
      updatedAt: exp.updatedAt,
      skills: exp.skills.map(es => es.skill)
    })
  );

  return transformedExperiences;
};

export const getExperiences = unstable_cache(_getExperiences, ['experiences'], {
  revalidate: 604800,
  tags: ['experiences']
});

/**
 * Get a single experience by ID with all related skills
 */
export const getExperienceById = async (
  id: string
): Promise<ExperienceWithSkills | null> => {
  const experience = await prisma.experience.findUnique({
    where: { id },
    include: {
      skills: {
        include: {
          skill: true
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!experience) return null;

  return {
    id: experience.id,
    role: experience.role,
    company: experience.company,
    location: experience.location,
    description: experience.description,
    summary: experience.summary,
    fromDate: experience.fromDate,
    toDate: experience.toDate,
    order: experience.order,
    createdAt: experience.createdAt,
    updatedAt: experience.updatedAt,
    skills: experience.skills.map(es => es.skill)
  };
};
