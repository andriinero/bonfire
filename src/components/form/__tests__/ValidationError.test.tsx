import { render, screen } from '@testing-library/react';
import ValidationError from '../ValidationError';

it('renders validation error message', () => {
  render(<ValidationError>child</ValidationError>);

  const error = screen.getByText(/child/);

  expect(error).toBeInTheDocument();
});
