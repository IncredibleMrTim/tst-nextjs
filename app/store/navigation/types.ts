export enum MenuItems {
  HOME = 'Home',
  EXPERIENCE = 'Experience',
  SKILLS = 'Skills',
  RESUME = 'Resume / CV'
}

export type MenuItem = {
  name: MenuItems;
  path: string;
  isActive?: boolean;
};
