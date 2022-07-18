import { useMatches } from '@tanstack/react-location';

import { DefaultLocationGenerics } from '@/providers';

export const Breadcrumbs = <
  TGenerics extends DefaultLocationGenerics = DefaultLocationGenerics
>() => {
  const matches = useMatches<TGenerics>();

  return (
    <div className="flex flex-wrap justify-between">
      {matches.map((match, index) => (
        <div key={index} className="flex items-center">
          <span className="text-sm font-semibold">{match.name}</span>
          <span className="text-sm font-semibold">{match.params.id}</span>
        </div>
      ))}
    </div>
  );
};
