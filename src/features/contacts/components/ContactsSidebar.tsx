import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import RecommendedContactList from './RecommendedContactList';

const ContactsSidebar = () => {
  return (
    <div className="grid h-full grid-rows-[auto,minmax(50px,150px),1fr]">
      <ContactsHeader />
      <RecommendedContactList />
      <ContactsList />
    </div>
  );
};

export default ContactsSidebar;
