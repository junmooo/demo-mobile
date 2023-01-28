import React from 'react';
import { isFragment } from 'react-is';

export function genPopupState() {
  const random = Math.random().toString();
  return {
    popupState: `popup-${random}`,
  };
}

export function toArray(
  children: React.ReactNode,
  option?: { keepEmpty?: boolean },
): React.ReactElement[] {
  let ret: React.ReactElement[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.Children.forEach(children, (child: any | any[]) => {
    if ((child === undefined || child === null) && !option?.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });

  return ret;
}
