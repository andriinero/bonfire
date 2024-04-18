import useHandleSignOut from '@/features/auth/hooks/useHandleSignOut';

import IconButton from '@/components/general/IconButton';
import {
  FaArrowRightFromBracket,
  FaMessage,
  FaUserGroup,
} from 'react-icons/fa6';
import usePathnameEnd from '@/hooks/usePathnameEnd';
import AppLink from '@/components/general/AppLink';
import Paths from '@/constants/Paths';

const NavControls = () => {
  const pathEnd = usePathnameEnd();

  const handleSignOutClick = useHandleSignOut();

  return (
    <nav className="">
      <ul className="space-y-1">
        <li>
          <AppLink to={Paths.Home.BASE + Paths.Home.CHATS}>
            <IconButton isSelected={pathEnd === 'chats'}>
              <FaMessage />
            </IconButton>
          </AppLink>
        </li>
        <li>
          <AppLink to={Paths.Home.BASE + Paths.Home.CONTACTS}>
            <IconButton isSelected={pathEnd === 'contacts'}>
              <FaUserGroup />
            </IconButton>
          </AppLink>
        </li>
        <li>
          <IconButton onClick={handleSignOutClick}>
            <FaArrowRightFromBracket />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
};

export default NavControls;
