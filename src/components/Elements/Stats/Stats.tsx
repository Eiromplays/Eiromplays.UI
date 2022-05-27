// Original source code: https://codepen.io/robstinson/pen/YzGjzgB

import clsx from 'clsx';
import React from 'react';
import CountUp, { CountUpProps } from 'react-countup';

export type StatsProps = {
  title: string | React.ReactNode;
  value: number | string | React.ReactNode;
  countUpProps?: CountUpProps;
  smallIcon?: React.ReactNode;
  largeIcon?: React.ReactNode;
  description?: string | React.ReactNode;
  percentage?: PercentageProps;
  children?: React.ReactNode;
};

export type PercentageProps = {
  text?: string;
  subText?: string;
  decrease?: boolean;
};

export const Stats = ({
  title,
  value,
  countUpProps,
  smallIcon,
  largeIcon,
  description,
  percentage,
  children,
}: StatsProps) => {
  const {
    text: percentageText,
    subText: percentageSubText,
    decrease: percentageDecrease,
  } = percentage || {};

  return (
    <div
      className={clsx(
        largeIcon ? 'w-96' : 'w-48',
        'bg-white dark:bg-lighter-black shadow-2xl p-6 rounded-2xl'
      )}
    >
      <div className="flex items-center">
        {smallIcon && (
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 mr-2">
            <div className="w-5 h-5">{smallIcon}</div>
          </span>
        )}
        <span className="text-sm font-medium text-gray-500 break-words">{title}</span>
      </div>
      <span className="block text-4xl font-semibold mt-4 break-words">
        {countUpProps ? <CountUp {...countUpProps} /> : value}
      </span>
      <div className="flex flex-column items-center">
        <div>
          {(percentageText || percentageSubText) && (
            <div className="flex text-xs mt-3 font-medium">
              {percentageText && (
                <span className={percentageDecrease ? 'text-red-500' : 'text-green-500'}>
                  {percentageText}
                </span>
              )}
              {percentageSubText && <span className="ml-1 text-gray-500">{percentageSubText}</span>}
            </div>
          )}
          {description && (
            <div className="flex text-xs mt-1.5 font-medium">
              <span className="ml-1 text-gray-500">{description}</span>
            </div>
          )}
        </div>
        {largeIcon && <div className="w-24 h-24 ml-auto">{largeIcon}</div>}
      </div>
      {children}
    </div>
  );
};
