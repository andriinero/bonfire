import { render, screen } from '@testing-library/react';

import TimeStamp from '../TimeStamp';
import AppDate from '@/lib/AppDate';

it('renders absolute time', () => {
  const absoluteDate = new Date('1999').toISOString();
  render(<TimeStamp date={absoluteDate} />);

  const formattedAbsoluteDate = AppDate.getAbsolute(absoluteDate).split(',')[0];
  const timeStamp = screen.getByText(formattedAbsoluteDate);

  expect(timeStamp).toBeInTheDocument();
});

it('renders simple time', () => {
  const now = new Date().toISOString();
  const formattedSimpleDate = AppDate.getSimple(now);
  render(<TimeStamp date={now} />);

  const timeStamp = screen.getByText(formattedSimpleDate);

  expect(timeStamp).toBeInTheDocument();
});
