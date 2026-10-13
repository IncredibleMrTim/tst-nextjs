import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { useActiveSection } from '@/hooks/useActiveSection';
import { navigationItems } from '@/lib/navigation';
import Navigation, { getNavigationHref } from './Navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));
jest.mock('@/hooks/useActiveSection', () => ({
  useActiveSection: jest.fn()
}));

const mockUsePathname = usePathname as jest.Mock;
const mockUseActiveSection = useActiveSection as jest.Mock;

describe('getNavigationHref', () => {
  const skills = navigationItems.find(item => item.sectionId === 'skills')!;
  const about = navigationItems.find(item => item.sectionId === 'about')!;

  it('should link to the section on the home page', () => {
    expect(getNavigationHref(skills, true)).toBe('#skills');
  });

  it('should link to the route for a section that has one', () => {
    expect(getNavigationHref(skills, false)).toBe('/skills');
  });

  it('should link back to the home section when there is no route', () => {
    expect(getNavigationHref(about, false)).toBe('/#about');
  });
});

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseActiveSection.mockReturnValue(null);
  });

  it('should render a link for every section', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Navigation />);

    navigationItems.forEach(item =>
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
    );
  });

  it('should mark the section in view as current on the home page', () => {
    mockUsePathname.mockReturnValue('/');
    mockUseActiveSection.mockReturnValue('work');
    render(<Navigation />);

    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'aria-current',
      'true'
    );
    expect(screen.getByRole('link', { name: 'Skills' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('should mark the link matching the route as current on a section route', () => {
    mockUsePathname.mockReturnValue('/experience');
    render(<Navigation />);

    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });

  it('should only watch sections on the home page', () => {
    mockUsePathname.mockReturnValue('/experience');
    render(<Navigation />);

    expect(mockUseActiveSection).toHaveBeenCalledWith([]);
  });
});
