import { render, screen } from '@testing-library/react';
import UserIcon from '../UserIcon';

it('renders user icon with correct path', () => {
  const imgPath = '/test.png';
  render(<UserIcon src={imgPath} />);

  const userIcon = screen.getByRole('img');

  expect(userIcon).toHaveAttribute('sr', imgPath);
});
