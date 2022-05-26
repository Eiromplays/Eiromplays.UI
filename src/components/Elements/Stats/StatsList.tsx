import React from 'react';

import { Stats, StatsProps } from './Stats';

export type StatsListProps = {
  items: StatsProps[];
  item_position?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
};

export const StatsList = ({ items, item_position = 'start' }: StatsListProps) => {
  return (
    <div className={`flex flex-wrap items-${item_position} gap-8`}>
      {items.map((props, index) => (
        <Stats key={index} {...props} />
      ))}
    </div>
  );
};
