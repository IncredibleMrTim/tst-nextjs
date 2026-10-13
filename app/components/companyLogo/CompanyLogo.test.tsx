import { render, screen } from '@testing-library/react';

import CompanyLogo from './CompanyLogo';

describe('CompanyLogo', () => {
  it('should show initials when the role has no logo', () => {
    render(<CompanyLogo logoUrl={null} company="MAD Productions Ltd" />);

    expect(screen.getByText('MP')).toBeInTheDocument();
    expect(document.querySelector('img')).toBeNull();
  });

  it('should render the uploaded logo', () => {
    render(
      <CompanyLogo
        logoUrl="https://cdn.sanity.io/images/p/d/logo.png"
        company="AstraZeneca"
      />
    );

    expect(document.querySelector('img')).toHaveAttribute(
      'src',
      'https://cdn.sanity.io/images/p/d/logo.png'
    );
    expect(screen.queryByText('AS')).toBeNull();
  });

  it('should hide the decorative logo from assistive tech', () => {
    const { container } = render(
      <CompanyLogo
        logoUrl="https://cdn.sanity.io/images/p/d/logo.png"
        company="AstraZeneca"
      />
    );

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
