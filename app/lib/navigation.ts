export interface NavigationItem {
  label: string;
  /** Section id on the home page; also the hash used to link to it. */
  sectionId: string;
  /** Standalone route that shows the same section, for deep links and SEO. */
  route?: string;
}

export const navigationItems: NavigationItem[] = [
  { label: 'About', sectionId: 'about' },
  { label: 'Skills', sectionId: 'skills', route: '/skills' },
  { label: 'Work', sectionId: 'work' },
  { label: 'Experience', sectionId: 'experience', route: '/experience' },
  { label: 'Projects', sectionId: 'projects' }
];

export const CV_URL = '/TimSmart_CV_02_03_26.pdf';
