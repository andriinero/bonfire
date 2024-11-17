import Spinner from '@/components/general/Spinner';
import { useGetRecommendedContactsQuery } from '../contactsSlice';
import RecommendedContactItem from './RecommendedContactItem';

const RecommendedContactList = () => {
  const {
    data: contactList,
    isLoading,
    isSuccess,
  } = useGetRecommendedContactsQuery();

  return (
    <div className="flex flex-col gap-4 overflow-x-auto border-b border-t p-5">
      <h2 className="text-md font-bold">Suggested Contacts</h2>
      <div className="flex flex-1 items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : isSuccess ? (
          contactList.length !== 0 ? (
            <ul className="flex flex-1 justify-around gap-6 overflow-x-auto px-8">
              {contactList.map((contact) => (
                <RecommendedContactItem
                  key={contact.id}
                  contactId={contact.id}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm">You're all caught up!</p>
          )
        ) : (
          <p>Error: fetching data</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedContactList;
