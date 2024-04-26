import { render, screen } from '@testing-library/react';
import ActionMessage from '../ActionMessage';

it('renders action message', () => {
  const messageText = 'test message';
  render(<ActionMessage body={messageText} />);

  const message = screen.getByText(messageText);

  expect(message).toBeInTheDocument();
});
