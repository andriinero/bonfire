import { AnimatePresence } from 'framer-motion';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import ContactsProfileCard from './ContactsProfileCard';
import RecommendedContact from './RecommendedContact';

const ContactsSidebar = () => {
  return (
    <div className="grid h-full grid-rows-[auto,auto,1fr]">
      <ContactsHeader />
      <RecommendedContact />
      <ContactsList />
      <AnimatePresence>
        <ContactsProfileCard />
      </AnimatePresence>
    </div>
  );
};

export default ContactsSidebar;
