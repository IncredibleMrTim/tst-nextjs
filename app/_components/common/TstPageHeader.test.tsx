import { screen } from '@testing-library/dom';
import TstPageHeader from './TstPageHeader';
import { setupMockRouter, renderWithRouter } from '@utils/testUtils';

describe('TstPageHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMockRouter();
  });

  it('should render with children as a string', () => {
    renderWithRouter(<TstPageHeader>Test</TstPageHeader>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render with children as a component', () => {
    renderWithRouter(
      <TstPageHeader>
        <h1>Test</h1>
      </TstPageHeader>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
