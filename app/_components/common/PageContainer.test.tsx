import { screen } from '@testing-library/dom';
import PageContainer from './PageContainer';
import { setupMockRouter, renderWithRouter } from '@utils/testUtils';

describe('PageContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMockRouter();
  });

  it('should render with children', () => {
    renderWithRouter(<PageContainer>My PageContainer</PageContainer>);

    const elem = screen.getByText('My PageContainer');
    expect(elem).toBeInTheDocument();
  });

  it('should render with no children', () => {
    const { container } = renderWithRouter(
      <PageContainer>My PageContainer</PageContainer>
    );

    expect(container?.firstChild as Element).toHaveAttribute('class');
  });
});
