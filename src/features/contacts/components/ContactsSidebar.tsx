import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import RecommendedContact from './RecommendedContact';

const ContactsSidebar = () => {
  return (
    <div className="grid h-full grid-rows-[auto,auto,1fr]">
      <ContactsHeader />
      <RecommendedContact />
      <ContactsList />
    </div>
  );
};

export default ContactsSidebar;
