import { MatchRoute, useMatches, useSearch } from '@tanstack/react-location';
import React from 'react';

import { Link, Spinner } from '@/components/Elements';
import { DefaultLocationGenerics } from '@/providers';

export const Breadcrumbs = <
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>() => {
  let matches = useMatches<TGenerics>();
  const search = useSearch<TGenerics>();

  matches = matches.filter(
    (match) => match.route.meta && match.route.meta.breadcrumb?.(match.params)
  );

  if (matches?.length <= 0) return null;

  return (
    <div className="bg-gray-200 dark:bg-lighter-black p-3 rounded font-sans m-4">
      <ol className="list-reset flex flex-wrap text-gray-900 dark:text-gray-300">
        {matches?.map((match, index) => (
          <li key={index} className="flex flex-wrap items-center">
            <span className="mx-2 text-gray-900 dark:text-gray-300">/</span>
            <Link to={match.pathname} search={search} className="block">
              <pre className={`text-sm`}>
                {match.route.meta && match.route.meta.breadcrumb?.(match.params)}{' '}
                <MatchRoute to={match.pathname} pending>
                  <Spinner size="md" className="inline-block" />
                </MatchRoute>
              </pre>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
