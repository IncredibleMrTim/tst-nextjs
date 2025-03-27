
export enum MenuItems {
  HOME = 'Home',
  EXPERIENCE = 'Experience',
  SKILLS = 'Skills'
}

export type MenuItem = {
  name: MenuItems;
  path: string;
  isActive?: boolean;
};