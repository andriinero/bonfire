import { useGetContactsQuery } from '../contactsSlice';

import ErrorMessage from '@/components/general/ErrorMessage';
import Spinner from '@/components/general/Spinner';
import ContactsItem from './ContactsItem';

const ContactsList = () => {
  const {
    data: contactsList,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetContactsQuery(0);

  const isDataLoading = isFetching || isLoading;

  return (
    <div className="overflow-y-auto p-4">
      {isDataLoading ? (
        <Spinner />
      ) : isSuccess ? (
        <div className="space-y-4 overflow-y-auto">
          <h2 className="text-sm text-gray-600">
            Active contacts ({contactsList.length})
          </h2>
          <ul className="space-y-2">
            {contactsList!.map((c) => (
              <ContactsItem key={c._id} contactId={c._id} />
            ))}
          </ul>
        </div>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default ContactsList;
