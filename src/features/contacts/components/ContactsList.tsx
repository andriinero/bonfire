import { useGetContactsQuery } from '../contactsSlice';

import Spinner from '@/components/general/Spinner';
import ErrorMessage from '@/components/general/ErrorMessage';
import ContactsItem from './ContactsItem';
import ListPlaceholder from '@/components/general/ListPlaceholder';

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
        contactsList.length > 0 ? (
          <ul className="space-y-2">
            {contactsList!.map((c) => (
              <ContactsItem key={c._id} contactId={c._id} />
            ))}
          </ul>
        ) : (
          <ListPlaceholder>Contact list is empty</ListPlaceholder>
        )
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default ContactsList;
