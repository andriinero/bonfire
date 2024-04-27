import { render, screen } from '@testing-library/react';
import TimeStamp from '../TimeStamp';

it('renders absolute time', () => {
  const absolute = new Date('1999').toISOString();
  render(<TimeStamp date={absolute} />);

  const timeStamp = screen.getByText('Jan 1');

  expect(timeStamp).toBeInTheDocument();
});

it('renders relative time', () => {
  const now = new Date().toISOString();
  render(<TimeStamp date={now} />);

  const timeStamp = screen.getByText(/\d{1,2}:\d{1,2} (AM|PM)/i);

  expect(timeStamp).toBeInTheDocument();
});
