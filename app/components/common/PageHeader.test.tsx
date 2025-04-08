import { screen } from '@testing-library/dom';
import PageHeader from './PageHeader';
import { setupMockRouter, renderWithRouter } from '@/utils/testUtils';

describe('PageHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMockRouter();
  });

  it('should render with children as a string', () => {
    renderWithRouter(<PageHeader>Test</PageHeader>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render with children as a component', () => {
    renderWithRouter(
      <PageHeader>
        <h1>Test</h1>
      </PageHeader>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
