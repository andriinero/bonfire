import { render, screen } from '@testing-library/react';
import InputLabel from '../InputLabel';

it('renders label for input', () => {
  render(
    <>
      <InputLabel htmlFor="test-input">label</InputLabel>
      <input id="test-input" />
    </>,
  );

  const label = screen.getByLabelText('label');

  expect(label).toBeInTheDocument();
});
