import useHandleSignOut from '@/features/auth/hooks/useHandleSignOut';
import usePathnameEnd from '@/hooks/usePathnameEnd';

import Paths from '@/constants/Paths';

import AppLink from '@/components/general/AppLink';
import IconButton from '@/components/general/IconButton';
import { LogOut, MessageSquare, Users } from 'lucide-react';

const NavControls = () => {
  const pathEnd = usePathnameEnd();

  const signOut = useHandleSignOut();

  const handleSignOutClick = (): void => {
    signOut();
  };

  const isChatsSelected = pathEnd === 'chats';
  const isContactsSelected = pathEnd === 'contacts';

  return (
    <nav className="w-full px-4 sm:px-0">
      <ul role="tablist" className="flex justify-around sm:flex-col sm:gap-2">
        <li>
          <AppLink
            to={Paths.Home.BASE + Paths.Home.CHATS}
            role="tab"
            tabIndex={0}
            aria-label="Chats Tab"
            aria-selected={isChatsSelected}
          >
            <IconButton tabIndex={-1} isSelected={isChatsSelected}>
              <MessageSquare />
            </IconButton>
          </AppLink>
        </li>
        <li>
          <AppLink
            to={Paths.Home.BASE + Paths.Home.CONTACTS}
            role="tab"
            tabIndex={0}
            aria-label="Contacts Tab"
            aria-selected={isContactsSelected}
          >
            <IconButton tabIndex={-1} isSelected={isContactsSelected}>
              <Users />
            </IconButton>
          </AppLink>
        </li>
        <li>
          <IconButton
            tabIndex={0}
            aria-label="Sign Out"
            onClick={handleSignOutClick}
          >
            <LogOut />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
};

export default NavControls;
