import type { User } from '@/types/User';
import { render, screen } from '@testing-library/react';
import UserMessage from '../UserMessage';

const selectedData = vi.hoisted(() => vi.fn());
vi.mock('@/app/hooks', () => ({
  useAppSelector: selectedData,
}));

const testUser: User = {
  id: 'user0',
  username: 'John',
  email: 'john@gmail.com',
  role: 'user',
  created: new Date().toISOString(),
  isOnline: true,
  profileImage:
    'https://img.freepik.com/premium-photo/profile-picture-happy-young-caucasian-man-spectacles-show-confidence-leadership-headshot-portrait-smiling-millennial-male-glasses-posing-indoors-home-employment-success-concept_774935-1446.jpg',
  colorClass: 'sky-400',
};

it('renders user message', () => {
  selectedData
    .mockReturnValueOnce('testChat01')
    .mockReturnValueOnce('user0')
    .mockReturnValueOnce(testUser);
  render(
    <UserMessage
      userId="user0"
      body="test message"
      created={new Date().toISOString()}
    />,
  );

  const message = screen.getByText('test message', { exact: true });

  expect(message).toBeInTheDocument();
});
