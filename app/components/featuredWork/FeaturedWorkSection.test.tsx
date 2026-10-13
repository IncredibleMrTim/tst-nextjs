import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithStore } from '@/utils/renderWithStore';
import { buildExperience, buildFeaturedWork } from '@/utils/testFixtures';
import FeaturedWorkSection from './FeaturedWorkSection';

describe('FeaturedWorkSection', () => {
  const experiences = [buildExperience({ id: 'role-1', company: 'Elanco' })];
  const featuredWork = [buildFeaturedWork({ experienceId: 'role-1' })];

  it('should show each result with its metric and company', () => {
    renderWithStore(
      <FeaturedWorkSection
        featuredWork={featuredWork}
        experiences={experiences}
      />
    );

    expect(screen.getByText('~70%')).toBeInTheDocument();
    expect(screen.getByText('AI persona architecture')).toBeInTheDocument();
    expect(screen.getByText('Elanco · Python · RAG')).toBeInTheDocument();
  });

  it('should ask for the role behind a result to be shown', async () => {
    const { store } = renderWithStore(
      <FeaturedWorkSection
        featuredWork={featuredWork}
        experiences={experiences}
      />
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Read the role' })
    );

    expect(store.getState().experienceFilter.focusedExperienceId).toBe(
      'role-1'
    );
  });
});
