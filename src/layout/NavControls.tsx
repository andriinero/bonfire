import usePathnameEnd from '@/hooks/usePathnameEnd';
import useHandleSignOut from '@/features/auth/hooks/useHandleSignOut';

import {
  FaArrowRightFromBracket,
  FaMessage,
  FaUserGroup,
} from 'react-icons/fa6';
import IconButton from '@/components/general/IconButton';
import AppLink from '@/components/general/AppLink';
import Paths from '@/constants/Paths';
import { useNavigate } from 'react-router-dom';
import { apiSlice } from '@/features/api/apiSlice';
import { useAppDispatch } from '@/app/hooks';

const NavControls = () => {
  const pathEnd = usePathnameEnd();

  const signOut = useHandleSignOut();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = (): void => {
    signOut();
    dispatch(apiSlice.util.resetApiState());
    navigate(Paths.Auth.SIGN_IN);
  };

  const isChatsSelected = pathEnd === 'chats';
  const isContactsSelected = pathEnd === 'contacts';

  return (
    <nav className="">
      <ul role="tablist" className="space-y-1">
        <li>
          <AppLink
            to={Paths.Home.BASE + Paths.Home.CHATS}
            role="tab"
            tabIndex={0}
            aria-label="Chats Tab"
            aria-selected={isChatsSelected}
          >
            <IconButton tabIndex={-1} isSelected={isChatsSelected}>
              <FaMessage />
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
              <FaUserGroup />
            </IconButton>
          </AppLink>
        </li>
        <li>
          <IconButton
            tabIndex={0}
            aria-label="Sign Out"
            onClick={handleSignOutClick}
          >
            <FaArrowRightFromBracket />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
};

export default NavControls;
