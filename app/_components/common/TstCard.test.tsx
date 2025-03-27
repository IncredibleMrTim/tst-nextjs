import { screen } from '@testing-library/dom';
import { setupMockRouter, renderWithRouter } from '@utils/testUtils';
import TstCard from './TstCard';
import { before } from 'node:test';

describe('TstCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMockRouter();
  });

  it('should render with children', () => {
    renderWithRouter(<TstCard>My Card</TstCard>);

    const elem = screen.getByText('My Card');
    expect(elem).toBeInTheDocument();
  });

  it('should render with no children', () => {
    const { container } = renderWithRouter(<TstCard>My Card</TstCard>);

    const elem = container.querySelector('.bg-white');
    expect(elem).toBeInTheDocument();
  });
});
