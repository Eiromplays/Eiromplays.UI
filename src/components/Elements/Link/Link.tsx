import clsx from 'clsx';
import { Link as RouterLink, LinkProps } from '@tanstack/react-location';

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={clsx('text-indigo-600 hover:text-indigo-900', className)} {...props}>
      {children}
    </RouterLink>
  );
};
