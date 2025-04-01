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
    const response = await fetch(`${process.env.TST_API}/experience`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = (await response.json()) as Experience[];

    return data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};
