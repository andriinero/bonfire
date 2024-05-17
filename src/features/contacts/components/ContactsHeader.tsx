import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  createContactsModalClosed,
  createContactsModalOpened,
  selectIsCreateContactModalOpen,
} from '../contactsSlice';

import IconButton from '@/components/general/IconButton';
import Modal from '@/components/general/Modal';
import { FaUserPlus } from 'react-icons/fa6';
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
    <div className="flex items-center justify-between gap-16 p-4">
      <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
      <IconButton onClick={handleModalOpen} style="round">
        <FaUserPlus />
      </IconButton>
      <Modal isOpen={isCreateContactModalOpen} onModalClick={handleModalClose}>
        <CreateContactForm />
      </Modal>
    </div>
  );
};

export default ContactsHeader;
