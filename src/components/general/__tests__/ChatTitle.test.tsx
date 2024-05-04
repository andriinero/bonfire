import { render, screen } from '@testing-library/react';
import ChatTitle from '../ChatTitle';

it('renders chat title', () => {
  render(<ChatTitle title="Test title" />);

  const title = screen.getByText('Test title');

  expect(title).toBeInTheDocument();
});
