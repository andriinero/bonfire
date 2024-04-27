import { render, screen } from '@testing-library/react';
import AppLink from '../AppLink';
import { BrowserRouter } from 'react-router-dom';

it('renders app link with correct href', () => {
  render(<AppLink to="/">child</AppLink>, { wrapper: BrowserRouter });

  const link = screen.getByRole('link', { name: 'child' });

  expect(link).toHaveAttribute('href', '/');
});
