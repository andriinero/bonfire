import { useGetContactsQuery } from '../contactsSlice';

import Spinner from '@/components/general/Spinner';
import ErrorMessage from '@/components/general/ErrorMessage';
import ContactsItem from './ContactsItem';

const ContactsList = () => {
  const {
    data: contactsList,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetContactsQuery();

  const isDataLoading = isFetching || isLoading;

  return (
    <div>
      {isDataLoading ? (
        <Spinner />
      ) : isSuccess ? (
        <ul className="space-y-2">
          {contactsList!.map((c) => (
            <ContactsItem key={c._id} contactId={c._id} />
          ))}
        </ul>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default ContactsList;
