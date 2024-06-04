import { forwardRef } from 'react';

import cn from '@/utils/cn';

import type { ForwardedRef, ReactNode } from 'react';
import type { NavLinkProps } from 'react-router-dom';

import { NavLink } from 'react-router-dom';

type AppLinkProps = { className?: string; children?: ReactNode } & NavLinkProps;

const AppLink = forwardRef(
  (
    { className, children, ...otherProps }: AppLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    return (
      <NavLink
        ref={ref}
        className={cn(
          'rounded-sm text-inherit no-underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-500',
          className,
        )}
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  },
);

export default AppLink;
