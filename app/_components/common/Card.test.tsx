import { screen } from '@testing-library/dom';
import { setupMockRouter, renderWithRouter } from '@utils/testUtils';
import Card from './Card';

describe('Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMockRouter();
  });

  it('should render with children', () => {
    renderWithRouter(<Card>My Card</Card>);

    const elem = screen.getByText('My Card');
    expect(elem).toBeInTheDocument();
  });

  it('should render with no children', () => {
    const { container } = renderWithRouter(<Card>My Card</Card>);

    const elem = container.querySelector('.bg-white');
    expect(elem).toBeInTheDocument();
  });
});
