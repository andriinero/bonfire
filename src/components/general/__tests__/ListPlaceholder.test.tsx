import { render, screen } from '@testing-library/react';
import ListPlaceholder from '../ListPlaceholder';

it('renders item list placeholder', () => {
  render(
    <ListPlaceholder>
      <p>test text</p>
    </ListPlaceholder>,
  );

  const placeholderText = screen.getByText('test text');

  expect(placeholderText).toBeInTheDocument();
});
