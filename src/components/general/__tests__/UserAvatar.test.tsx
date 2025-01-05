import { render, screen } from '@testing-library/react';
import UserAvatar from '../UserAvatar';

it('renders user icon with correct path', () => {
  const imgPath = '/test.png';
  render(<UserAvatar src={imgPath} />);

  const userIcon = screen.getByRole('img');

  expect(userIcon).toHaveAttribute('src', imgPath);
});
