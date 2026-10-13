import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { buildProfile } from '@/utils/testFixtures';
import About from './About';

const education = [
  {
    id: 'education-1',
    institution: 'Southampton Solent University',
    qualification: 'BSc (Hons) Software Engineering',
    fromYear: 2005,
    toYear: 2009,
    order: 1,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01')
  }
];

describe('About', () => {
  it('should lead with the first paragraph of the profile', () => {
    render(<About profile={buildProfile()} education={education} />);

    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.queryByText('Second paragraph.')).not.toBeInTheDocument();
  });

  it('should list education with its years', () => {
    render(<About profile={buildProfile()} education={education} />);

    expect(screen.getByText('2005 – 2009')).toBeInTheDocument();
    expect(
      screen.getByText('Southampton Solent University')
    ).toBeInTheDocument();
  });

  it('should show the full profile in a dialog', async () => {
    render(<About profile={buildProfile()} education={education} />);

    await userEvent.click(
      screen.getByRole('button', { name: /Read the full profile/ })
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('About Tim');
    expect(dialog).toHaveTextContent('Second paragraph.');
  });

  it('should close the dialog with the escape key', async () => {
    render(<About profile={buildProfile()} education={education} />);
    await userEvent.click(
      screen.getByRole('button', { name: /Read the full profile/ })
    );

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
