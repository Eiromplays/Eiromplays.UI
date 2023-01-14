// Original source code: https://codesandbox.io/s/dynamiciconload-react-icons-6imgv?file=/src/DynamicIcon.tsx

import React, { CSSProperties, SVGAttributes } from 'react';
import { IconContext } from 'react-icons';
import * as FontAwesome from 'react-icons/fa';

export type DynamicIconProps = {
  iconName: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
};

export const DynamicIcon = ({
  iconName,
  color = '',
  size = '',
  className = '',
  style,
  attr,
}: DynamicIconProps) => {
  if (!iconName || iconName.length < 1) return <div>Could Not Find Icon</div>;

  try {
    const faIcon = (FontAwesome as any)[
      `Fa${iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase()}`
    ];

    if (!faIcon) return <></>;

    const IconComponent = React.createElement(faIcon);

    const value: IconContext = {
      color: color,
      size: size,
      className: className,
      style: style,
      attr: attr,
    };

    return IconComponent ? (
      <IconContext.Provider value={value}>{IconComponent}</IconContext.Provider>
    ) : (
      <></>
    );
  } catch {
    // In case of error, return an empty div
    // to prevent the app from crashing
    return <></>;
  }
};
