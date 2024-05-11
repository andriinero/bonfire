import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';

const ContactsSidebar = () => {
  return (
    <div className="grid h-full grid-rows-[auto,1fr] space-y-4">
      <ContactsHeader />
      <ContactsList />
    </div>
  );
};

export default ContactsSidebar;
