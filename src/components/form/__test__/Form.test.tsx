import { render, screen } from '@testing-library/react';

import Form from '../Form';

it('renders form with children', () => {
  render(<Form>child</Form>);

  const form = screen.getByRole('form');

  expect(form).toHaveTextContent('child');
});
