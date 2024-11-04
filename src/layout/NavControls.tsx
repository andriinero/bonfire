import { useAppSelector } from '@/app/hooks';
import { selectAuthData } from '@/features/auth/authSlice';
import useHandleSignOut from '@/features/auth/hooks/useHandleSignOut';
import usePathnameEnd from '@/hooks/usePathnameEnd';

import Paths from '@/constants/Paths';

import AppLink from '@/components/general/AppLink';
import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, MessageSquare, Users } from 'lucide-react';

const NavControls = () => {
  const pathEnd = usePathnameEnd();

  const isChatsSelected = pathEnd === 'chats';
  const isContactsSelected = pathEnd === 'contacts';

  const authData = useAppSelector(selectAuthData);

  const handleSignOut = useHandleSignOut();

  return (
    <nav className="h-full w-full px-4 sm:px-0">
      <ul
        role="tablist"
        className="flex h-full justify-around sm:flex-col sm:gap-4"
      >
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
        <li className="mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <UserIcon
                title={authData?.username}
                src={authData?.profile_image}
                colorClass={authData?.color_class}
                className="ring-2 ring-amber-500 ring-offset-1"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>{authData?.username}</DropdownMenuLabel>
              <DropdownMenuLabel className="pt-0 text-xs font-normal">
                {authData?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-700"
              >
                Exit
                <LogOut className="ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
};

export default NavControls;
