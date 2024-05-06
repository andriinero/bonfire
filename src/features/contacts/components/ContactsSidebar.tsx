import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';

const ContactsSidebar = () => {
  return (
    <div className="h-full space-y-4">
      <ContactsHeader />
      <ContactsList />
    </div>
  );
};

export default ContactsSidebar;
