import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import RecommendedContactList from './RecommendedContactList';

const ContactsSidebar = () => {
  return (
    <div className="grid h-full grid-rows-[auto,auto,1fr]">
      <ContactsHeader />
      <RecommendedContactList />
      <ContactsList />
    </div>
  );
};

export default ContactsSidebar;
