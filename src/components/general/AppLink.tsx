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
        className={cn('text-inherit no-underline', className)}
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  },
);

export default AppLink;
