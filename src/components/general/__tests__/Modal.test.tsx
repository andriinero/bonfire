import { render, screen } from '@testing-library/react';

import Modal from '@/components/general/Modal';
import userEvent from '@testing-library/user-event';

it("doesn't render closed modal", () => {
  render(<Modal isOpen={false} onBackdropClick={() => {}} />);

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it('renders open modal', () => {
  render(<Modal isOpen={true} onBackdropClick={() => {}} />);

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
});

it('handles backdrop click', async () => {
  const user = userEvent.setup();
  const handleModalClick = vi.fn();
  render(<Modal isOpen={true} onBackdropClick={handleModalClick} />);

  await user.click(screen.getByLabelText('Modal Backdrop'));

  expect(handleModalClick).toHaveBeenCalledOnce();
});
