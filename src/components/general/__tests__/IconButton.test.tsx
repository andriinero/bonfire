import { render, screen } from '@testing-library/react';
import IconButton from '../IconButton';

it('renders icon button', () => {
  render(<IconButton>child</IconButton>);

  const button = screen.getByRole('button', { name: 'child' });

  expect(button).toBeInTheDocument();
});
