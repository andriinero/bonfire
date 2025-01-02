import { useGetRecommendedContactsQuery } from '../contactsSlice';

import ListPlaceholder from '@/components/general/ListPlaceholder';
import Spinner from '@/components/general/Spinner';
import RecommendedContactItem from './RecommendedContactItem';

const RecommendedContactList = () => {
  const {
    data: contactList,
    isLoading,
    isSuccess,
  } = useGetRecommendedContactsQuery();

  return (
    <div className="flex flex-col gap-4 overflow-x-auto border-b border-t p-5">
      <h2 className="text-md font-semibold">Suggested Contacts</h2>
      <div className="flex w-full flex-1 items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : isSuccess ? (
          contactList.length > 0 ? (
            <ul className="flex flex-1 justify-around gap-6 overflow-x-auto px-4">
              {contactList.map((contact) => (
                <RecommendedContactItem
                  key={contact.id}
                  contactId={contact.id}
                />
              ))}
            </ul>
          ) : (
            <ListPlaceholder className="text-sm">
              You're all caught up!
            </ListPlaceholder>
          )
        ) : (
          <p>Error: fetching data</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedContactList;
