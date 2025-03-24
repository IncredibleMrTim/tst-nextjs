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
