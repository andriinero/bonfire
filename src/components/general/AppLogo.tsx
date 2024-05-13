import Paths from '@/constants/Paths';
import cn from '@/utils/cn';

import AppLink from './AppLink';

type AppLogoProps = { className?: string };

const AppLogo = ({ className }: AppLogoProps) => {
  return (
    <AppLink to={Paths.Auth.SIGN_IN}>
      <img
        className={cn('mx-auto size-10', className)}
        src="/messenger.png"
        alt="Bonfire App Icon"
      />
    </AppLink>
  );
};

export default AppLogo;
