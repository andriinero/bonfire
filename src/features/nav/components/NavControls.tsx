import IconButton from '@/components/general/ControlsIcon';
import useHandleSignOut from '@/features/auth/hooks/useHandleSignOut';
import {
  FaArrowRightFromBracket,
  FaMessage,
  FaUserGroup,
} from 'react-icons/fa6';

const NavControls = () => {
  const handleSignOutClick = useHandleSignOut();

  return (
    <nav>
      <ul className="space-y-1">
        <li>
          <IconButton>
            <FaMessage />
          </IconButton>
        </li>
        <li>
          <IconButton>
            <FaUserGroup />
          </IconButton>
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
