import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavButton from './NavigationButton';

describe('NavigationButton', () => {
  const mockOnClick = jest.fn();
  const mockMenuItem = {
    name: 'Home',
    path: '/',
    isActive: false
  };

  it('renders the button with inactive state', () => {
    render(
      <NavButton onClick={mockOnClick} menuItem={mockMenuItem}>
        Home
      </NavButton>
    );

    const button = screen.getByRole('button', { name: /home/i });
    expect(button).toHaveClass('!border-transparent');
    expect(button).not.toHaveClass('!bg-slate-100 !border-slate-400');
  });

  it('renders the button with active state', () => {
    const activeMenuItem = { ...mockMenuItem, isActive: true };

    render(
      <NavButton onClick={mockOnClick} menuItem={activeMenuItem}>
        Home
      </NavButton>
    );

    const button = screen.getByRole('button', { name: /home/i });
    expect(button).toHaveClass('!bg-slate-100 !border-slate-400');
  });

  it('calls onClick when the button is clicked', async () => {
    render(
      <NavButton onClick={mockOnClick} menuItem={mockMenuItem}>
        Home
      </NavButton>
    );

    const button = screen.getByRole('button', { name: /home/i });
    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledWith(mockMenuItem);
  });
});
