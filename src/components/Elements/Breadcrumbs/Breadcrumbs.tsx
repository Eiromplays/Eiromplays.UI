import { useMatches } from '@tanstack/react-location';
import React from 'react';

import { Link } from '@/components/Elements';
import { DefaultLocationGenerics } from '@/providers';

export const Breadcrumbs = <
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>() => {
  let matches = useMatches<TGenerics>();

  matches = matches.filter(
    (match) => match.route.meta && match.route.meta.breadcrumb(match.params)
  );

  if (matches?.length <= 0) return null;

  return (
    <div className="bg-gray-200 dark:bg-lighter-black p-3 rounded font-sans m-4">
      <ol className="list-reset flex text-gray-900 dark:text-gray-300">
        {matches?.map((match, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-gray-900 dark:text-gray-300">/</span>
            <Link to={match.pathname}>
              {match.route.meta && match.route.meta.breadcrumb(match.params)}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
