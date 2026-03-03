import { $Enums } from '@prisma/client';

export type SkillType = $Enums.SkillType;

export const skillTypeMap: Record<SkillType, { label: string; description: string }> = {
  TECHNOLOGIES: {
    label: 'Languages & Core Technologies',
    description: 'Core programming languages and foundational technologies'
  },
  FRONTEND: {
    label: 'Frontend Development',
    description: 'Frontend frameworks, libraries, and UI tools'
  },
  STYLING: {
    label: 'Styling & UI',
    description: 'CSS frameworks and UI component libraries'
  },
  BACKEND: {
    label: 'Backend & APIs',
    description: 'Server-side technologies and API development'
  },
  TESTING: {
    label: 'Testing & Tooling',
    description: 'Testing frameworks and development tools'
  },
  DEVOPS: {
    label: 'Cloud & DevOps',
    description: 'Cloud platforms and deployment technologies'
  },
  AI: {
    label: 'AI-Augmented Development',
    description: 'AI-powered development tools'
  },
  METHODOLOGIES: {
    label: 'Methodologies & Leadership',
    description: 'Development practices and team leadership'
  }
};

/**
 * Get the display label for a skill type
 */
export function getSkillTypeLabel(type: SkillType): string {
  return skillTypeMap[type]?.label || type;
}

/**
 * Get the description for a skill type
 */
export function getSkillTypeDescription(type: SkillType): string {
  return skillTypeMap[type]?.description || '';
}

/**
 * Get all skill types sorted by their natural order
 */
export function getAllSkillTypes(): SkillType[] {
  return Object.keys(skillTypeMap) as SkillType[];
}
