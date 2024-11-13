import useInitHome from '@/hooks/useInitHome';
import useContactInfiniteScroll from '../hooks/useContactInfiniteScroll';

import { useGetContactsQuery } from '../contactsSlice';

import ErrorMessage from '@/components/general/ErrorMessage';
import Spinner from '@/components/general/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContactsItem from './ContactsItem';

const ContactsList = () => {
  const { isLoading, isFetching, isSuccess } = useInitHome();
  const { data: contactsList } = useGetContactsQuery(0);
  const { hasMore, fetchNext } = useContactInfiniteScroll();

  const isDataLoading = isFetching || isLoading;

  return (
    <div className="overflow-y-auto p-4 py-0 sm:p-4">
      {isDataLoading ? (
        <Spinner />
      ) : isSuccess ? (
        <div className="space-y-4 overflow-y-auto">
          <h2 className="text-sm text-gray-600">
            Active contacts ({contactsList!.length})
          </h2>
          <ul id="contacts-list">
            <InfiniteScroll
              className="space-y-2"
              dataLength={contactsList!.length}
              next={fetchNext}
              hasMore={hasMore}
              loader={<Spinner />}
              scrollThreshold="600px"
              scrollableTarget="contacts-list"
            >
              {contactsList!.map((c) => (
                <ContactsItem key={c.id} contactId={c.id} />
              ))}
            </InfiniteScroll>
          </ul>
        </div>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default ContactsList;
