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
    <div className="border-b border-t p-4 shadow-sm">
      {isLoading ? (
        <Spinner />
      ) : isSuccess ? (
        <ul className="flex justify-around gap-6 px-8">
          {contactList.map((contact) => (
            <RecommendedContactItem key={contact.id} contactId={contact.id} />
          ))}
        </ul>
      ) : (
        <p>Error: fetching data</p>
      )}
    </div>
  );
};

export default RecommendedContactList;
