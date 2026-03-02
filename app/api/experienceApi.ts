export type Experience = {
  role: string;
  company: string;
  order: number;
  location: string;
  fromDate: Date;
  toDate: Date;
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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/experience`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Experience API returned ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as Experience[];

    return data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};
