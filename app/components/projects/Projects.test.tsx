import { render, screen } from '@testing-library/react';

import { buildProject } from '@/utils/testFixtures';
import Projects from './Projects';

describe('Projects', () => {
  it('should show each project with its role and bullet points', () => {
    render(<Projects projects={[buildProject()]} />);

    expect(screen.getByText('Skim Reapers')).toBeInTheDocument();
    expect(screen.getByText(/Product Owner \/ Engineer/)).toBeInTheDocument();
    expect(screen.getByText('Designed the site')).toBeInTheDocument();
  });

  it('should show when a dated project ran', () => {
    render(<Projects projects={[buildProject()]} />);

    expect(screen.getByText(/Jul 2026 – Present/)).toBeInTheDocument();
  });

  it('should leave out dates for an undated project', () => {
    render(
      <Projects projects={[buildProject({ fromDate: null, toDate: null })]} />
    );

    expect(screen.queryByText(/Present/)).not.toBeInTheDocument();
  });

  it('should open the project site in a new tab', () => {
    render(<Projects projects={[buildProject()]} />);

    const link = screen.getByRole('link', { name: /Visit site/ });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should not offer a link when there is no site', () => {
    render(<Projects projects={[buildProject({ url: null })]} />);

    expect(
      screen.queryByRole('link', { name: /Visit site/ })
    ).not.toBeInTheDocument();
  });
});
