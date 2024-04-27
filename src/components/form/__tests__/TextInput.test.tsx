import { render, screen } from '@testing-library/react';
import TextInput from '../TextInput';

it('renders input field', () => {
  render(<TextInput />);

  const input = screen.getByRole('textbox');

  expect(input).toBeInTheDocument();
});
