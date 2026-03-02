import { $Enums } from '@prisma/client';

export type SkillType = $Enums.SkillType;
export type Skill = {
  name: string;
  description: string;
};

export type SkillCategories = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: SkillType;
  title: string;
  order: number;
  skills: Skill[];
};

export const getSkills = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Skills API returned ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as SkillCategories;

    return data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};
