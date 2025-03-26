export enum SkillType {
  'DEVELOPMENT' = 'Development',
  'DESIGN' = 'Design',
  'PLANNING' = 'Planning',
  'MANAGEMENT' = 'Management'
}
export type Skill = {
  name: string;
  description: string;
};

export type SkillCategories = [
  {
    title: string;
    skills: Skill[];
  }
];

export const getSkills = async () => {
  try {
    const response = await fetch(`${process.env.TST_API}/skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = (await response.json()) as SkillCategories;

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};
