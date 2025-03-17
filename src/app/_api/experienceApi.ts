'use server';

export type ExperienceModal = {
  role: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description: string;
  skills: [
    {
      order: number;
      name: string;
    }
  ];
};

export const getExperience = async () => {
  try {
    const response = await fetch('http://localhost:8080/experience', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = (await response.json()) as ExperienceModal[];

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};
