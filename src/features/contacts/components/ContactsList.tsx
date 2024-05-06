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

  return isDataLoading ? (
    <Spinner />
  ) : isSuccess ? (
    <div>
      <h2 className='text-sm text-gray-600'>Active contacts ({contactsList.length})</h2>
      <ul className="space-y-2">
        {contactsList!.map((c) => (
          <ContactsItem key={c._id} contactId={c._id} />
        ))}
      </ul>
    </div>
  ) : (
    <ErrorMessage />
  );
};

export default ContactsList;
