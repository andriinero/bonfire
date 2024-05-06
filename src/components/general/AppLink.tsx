import { ForwardedRef, ReactNode, forwardRef } from 'react';

import cn from '@/utils/cn';

import { NavLink, NavLinkProps } from 'react-router-dom';

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
          'text-inherit no-underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 rounded-sm',
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
