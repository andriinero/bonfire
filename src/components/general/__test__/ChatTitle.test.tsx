import { render, screen } from '@testing-library/react';
import ChatTitle from '../ChatTitle';

it('renders chat title', () => {
  render(<ChatTitle title="test_title" />);

  const title = screen.getByText('test_title');

  expect(title).toBeInTheDocument();
});
