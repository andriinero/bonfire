import { render, screen } from '@testing-library/react';
import Button from '../Button';

it('renders button', () => {
  render(<Button />);

  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
});

it('renders disabled button', () => {
  render(<Button disabled />);

  const button = screen.getByRole('button');

  expect(button).toHaveAttribute('disabled');
});
