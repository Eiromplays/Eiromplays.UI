import { Link as RouterLink, LinkProps } from '@tanstack/react-location';
import clsx from 'clsx';
import React from 'react';

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={clsx('text-indigo-600 hover:text-indigo-900', className)} {...props}>
      {children}
    </RouterLink>
  );
};
