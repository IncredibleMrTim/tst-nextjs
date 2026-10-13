import { render, screen } from '@testing-library/react';

import { CV_URL } from '@/lib/navigation';
import { buildProfile } from '@/utils/testFixtures';
import ClosingCard from './ClosingCard';

describe('ClosingCard', () => {
  it('should offer the email address as a mail link', () => {
    render(<ClosingCard profile={buildProfile()} />);

    expect(
      screen.getByRole('link', { name: 'tim@example.com' })
    ).toHaveAttribute('href', 'mailto:tim@example.com');
  });

  it('should open the CV in a new tab', () => {
    render(<ClosingCard profile={buildProfile()} />);

    const link = screen.getByRole('link', { name: 'Download CV' });
    expect(link).toHaveAttribute('href', CV_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should link out to LinkedIn and GitHub', () => {
    render(<ClosingCard profile={buildProfile()} />);

    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/example'
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/example'
    );
  });
});
