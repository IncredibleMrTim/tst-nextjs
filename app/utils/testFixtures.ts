import { type Role } from '@/actions/role.actions';
import { type FeaturedWork } from '@/actions/featuredWork.actions';
import { type Profile } from '@/actions/profile.actions';
import { type Project } from '@/actions/project.actions';

const FIXED_DATE = new Date('2026-01-01');

export const buildExperience = (overrides: Partial<Role> = {}): Role => ({
  id: 'experience-1',
  role: 'Senior Frontend Engineer',
  company: 'Acme Ltd',
  location: 'Remote',
  summary: '- Built the design system\n- Led the React migration',
  fromDate: new Date('2024-02-01'),
  toDate: new Date('2025-03-01'),
  type: 'Contract',
  logoUrl: null,
  technologies: ['React', 'TypeScript'],
  ...overrides
});

export const buildFeaturedWork = (
  overrides: Partial<FeaturedWork> = {}
): FeaturedWork => ({
  id: 'work-1',
  experienceId: 'experience-1',
  metric: '~70%',
  label: 'faster',
  title: 'AI persona architecture',
  description: 'Rebuilt a proof of concept.',
  technologies: 'Python · RAG',
  order: 1,
  createdAt: FIXED_DATE,
  updatedAt: FIXED_DATE,
  ...overrides
});

export const buildProject = (overrides: Partial<Project> = {}): Project => ({
  id: 'project-1',
  name: 'Skim Reapers',
  role: 'Product Owner / Engineer',
  fromDate: new Date('2026-07-01'),
  toDate: null,
  summary: '- Designed the site\n- Integrated a CMS',
  technologies: ['Next.js'],
  url: 'https://example.com',
  order: 1,
  createdAt: FIXED_DATE,
  updatedAt: FIXED_DATE,
  ...overrides
});

export const buildProfile = (overrides: Partial<Profile> = {}): Profile => ({
  id: 'profile',
  name: 'Tim Smart',
  companyName: 'Tim Smart Technology LTD',
  jobTitle: 'Senior Full Stack Engineer',
  introduction: 'I build web products.',
  about: ['First paragraph.', 'Second paragraph.'],
  email: 'tim@example.com',
  githubUrl: 'https://github.com/example',
  linkedinUrl: 'https://linkedin.com/in/example',
  heroSkills: ['Next.js', 'TypeScript'],
  featuredSkills: ['React', 'TypeScript'],
  highlightMetric: '~70%',
  highlightLabel: 'AI performance\nimprovement',
  currentProjectTitle: 'Process management',
  currentProjectTechnologies: 'Next.js · Claude API',
  createdAt: FIXED_DATE,
  updatedAt: FIXED_DATE,
  ...overrides
});
