import { render, screen } from '@testing-library/react';
import InputGroup from '../InputGroup';

it('renders children', () => {
  render(<InputGroup>child</InputGroup>);

  const group = screen.getByText('child');

  expect(group).toBeInTheDocument();
});
