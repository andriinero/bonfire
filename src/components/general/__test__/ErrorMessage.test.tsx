import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

it('renders general error message', () => {
  render(<ErrorMessage />);

  const errorMessage = screen.getByText('error', { exact: false });

  expect(errorMessage).toBeInTheDocument();
});
