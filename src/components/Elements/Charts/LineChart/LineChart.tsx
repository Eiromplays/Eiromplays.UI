import { ContentLayout } from 'eiromplays-ui';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  LegendProps,
  Line,
  LineChart,
  LineProps,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Tooltip,
  TooltipProps,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from 'recharts';

export type LineChart2Props = {
  data: any[];
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  responseContainerProps?: ResponsiveContainerProps;
  lines?: LineProps[];
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  tooltipProps?: TooltipProps<any, any>;
  children?: React.ReactNode;
};

export const LineChart2 = ({
  data,
  title,
  subTitle,
  responseContainerProps,
  lines,
  xAxisProps,
  yAxisProps,
  tooltipProps,
  children,
}: LineChart2Props) => {
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div>
        <h3 className="text-4xl">{title}</h3>
        <p className="text-sm">{subTitle}</p>
      </div>
      <ResponsiveContainer {...responseContainerProps}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          {lines?.map((line, index) => (
            <Line key={index} type="monotone" dataKey={line.dataKey} stroke={line.stroke} />
          ))}
          {children}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
