import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import { renderWithStore } from '@/utils/renderWithStore';
import { buildExperience } from '@/utils/testFixtures';
import SkillMatrix from './SkillMatrix';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

const mockPush = jest.fn();

const experiences = [
  buildExperience({
    id: 'new',
    company: 'New Co',
    fromDate: new Date('2025-01-01'),
    summary: '- Led a migration',
    technologies: ['React', 'TypeScript']
  }),
  buildExperience({
    id: 'old',
    company: 'Old Co',
    fromDate: new Date('2010-01-01'),
    summary: '- Built desktop clients',
    technologies: ['C#']
  })
];

describe('SkillMatrix', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should show how many roles used each skill', () => {
    renderWithStore(
      <SkillMatrix
        skills={['React', 'C#', 'Rust']}
        experiences={experiences}
        experienceHref="/#experience"
      />
    );

    expect(
      screen.getByRole('button', { name: /^React used in 1 of 2 roles/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^Rust used in 0 of 2 roles/ })
    ).toBeInTheDocument();
  });

  it('should light the cells for roles that used the skill, oldest first', () => {
    renderWithStore(
      <SkillMatrix
        skills={['C#']}
        experiences={experiences}
        experienceHref="/#experience"
      />
    );
    const cells = document.querySelectorAll('button i');

    // oldest role first: Old Co used C#, New Co did not
    expect(cells[0]).toHaveAttribute('title', 'Old Co – used');
    expect(cells[1]).toHaveAttribute('title', 'New Co');
  });

  it('should filter by the chosen skill and go to the experience', async () => {
    const { store } = renderWithStore(
      <SkillMatrix
        skills={['React']}
        experiences={experiences}
        experienceHref="/experience"
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /^React/ }));

    expect(store.getState().experienceFilter.skill).toBe('React');
    expect(mockPush).toHaveBeenCalledWith('/experience');
  });
});
