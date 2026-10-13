import { render, screen } from '@testing-library/react';

import { buildProfile } from '@/utils/testFixtures';
import Hero from './Hero';

const stats = { yearsInSoftware: 17, roleCount: 13, technologyCount: 42 };

describe('Hero', () => {
  it('should show the name, company and job title', () => {
    render(<Hero profile={buildProfile()} stats={stats} />);

    expect(
      screen.getByRole('heading', { level: 1, name: /^Tim Smart/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Tim Smart Technology LTD')).toBeInTheDocument();
    expect(screen.getAllByText('Senior Full Stack Engineer')).not.toHaveLength(
      0
    );
  });

  it('should show the career stats', () => {
    render(<Hero profile={buildProfile()} stats={stats} />);

    expect(screen.getByText('17+')).toBeInTheDocument();
    expect(screen.getByText('13')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should show the highlight and what is being built now', () => {
    render(<Hero profile={buildProfile()} stats={stats} />);

    expect(screen.getByText('~70%')).toBeInTheDocument();
    expect(screen.getByText('Building now')).toBeInTheDocument();
    expect(screen.getByText('Process management')).toBeInTheDocument();
  });

  it('should list the hero skills', () => {
    render(<Hero profile={buildProfile()} stats={stats} />);

    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('should open social profiles in a new tab', () => {
    render(<Hero profile={buildProfile()} stats={stats} />);

    ['GitHub', 'LinkedIn'].forEach(name => {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
