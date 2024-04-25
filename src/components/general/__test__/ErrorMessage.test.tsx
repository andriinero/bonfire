import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

it('renders general error message with default error message', () => {
  render(<ErrorMessage />);

  const errorMessage = screen.getByText('error', { exact: false });

  expect(errorMessage).toBeInTheDocument();
});

it('renders general error message with custom text', () => {
  render(<ErrorMessage>upload error</ErrorMessage>);

  const errorMessage = screen.getByText('upload error', { exact: false });

  expect(errorMessage).toBeInTheDocument();
});
