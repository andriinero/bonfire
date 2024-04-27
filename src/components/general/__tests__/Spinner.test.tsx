import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

it('renders spinner', () => {
  render(<Spinner />);

  const spinner = screen.getByLabelText('Spinner Icon');

  expect(spinner).toBeInTheDocument();
});
