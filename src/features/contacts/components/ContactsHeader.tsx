import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  createContactsModalClosed,
  createContactsModalOpened,
  selectIsCreateContactModalOpen,
} from '../contactsSlice';

import Modal from '@/components/general/Modal';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import CreateContactForm from './CreateContactForm';

const ContactsHeader = () => {
  const isCreateContactModalOpen = useAppSelector(
    selectIsCreateContactModalOpen,
  );
  const dispatch = useAppDispatch();

  const handleModalOpen = () => {
    dispatch(createContactsModalOpened());
  };

  const handleModalClose = () => {
    dispatch(createContactsModalClosed());
  };

  return (
    <div className="flex items-center justify-between gap-16 px-4 py-5">
      <h1 className="text-2xl font-bold text-gray-950">Contacts</h1>
      <Button
        aria-label="Create Contact"
        onClick={handleModalOpen}
        variant="roundedGhost"
        size="icon"
      >
        <UserPlus />
      </Button>
      <Modal
        isOpen={isCreateContactModalOpen}
        onBackdropClick={handleModalClose}
      >
        <CreateContactForm onCloseClick={handleModalClose} />
      </Modal>
    </div>
  );
};

export default ContactsHeader;
