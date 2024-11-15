import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import RecommendedContacts from './RecommendedContacts';

const ContactsSidebar = () => {
  return (
    <div className="grid h-full grid-rows-[auto,auto,1fr]">
      <ContactsHeader />
      <RecommendedContacts />
      <ContactsList />
    </div>
  );
};

export default ContactsSidebar;
