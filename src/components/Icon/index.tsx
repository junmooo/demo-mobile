import type { IconProps as NutIconProps } from '@nutui/nutui-react';
import { Icon as NutIcon } from '@nutui/nutui-react';
import React from 'react';

type IconProps = Partial<NutIconProps>;

export const Icon = React.memo(function Icon(props: IconProps) {
  return <NutIcon fontClassName="iconfont" classPrefix="icon" {...props} />;
});
