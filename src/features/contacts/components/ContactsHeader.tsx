import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  createContactsModalClosed,
  createContactsModalOpened,
  selectIsCreateContactModalOpen,
} from '../contactsSlice';

import IconButton from '@/components/general/IconButton';
import Modal from '@/components/general/Modal';
import { UserPlus } from 'lucide-react';
import CreateContactForm from './CreateContactForm';

const ContactsHeader = () => {
  const isCreateContactModalOpen = useAppSelector(
    selectIsCreateContactModalOpen,
  );

  const dispatch = useAppDispatch();

  const handleModalOpen = (): void => {
    dispatch(createContactsModalOpened());
  };

  const handleModalClose = (): void => {
    dispatch(createContactsModalClosed());
  };

  return (
    <div className="flex items-center justify-between gap-16 p-5">
      <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
      <IconButton
        aria-label="Create Contact"
        onClick={handleModalOpen}
        style="round"
      >
        <UserPlus />
      </IconButton>
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
