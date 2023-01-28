import React, { useMemo } from 'react';
import { toArray } from '../utils';
import Item from './Item';
import styles from './style.module.css';

type FlexBoxProps = {
  /** 上下对齐方式 */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /** 水平对齐方式，默认start */
  justifyContent?: 'start' | 'end' | 'center' | 'around' | 'between';
  /** 间距方向，默认horizontal */
  direction?: 'vertical' | 'horizontal';
  /** 是否自动换行，仅在 horizontal 时有效，默认false */
  wrap?: boolean;
  /** 子项的间距，默认middle */
  size?: 'small' | 'middle' | 'large';
  /** 为true时，box宽度为100%，children将不再有Item组件包裹，size属性同时将无效 */
  block?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const directionStyleMap = {
  vertical: 'column',
  horizontal: 'row',
};

const alignStyleMap = {
  baseline: 'baseline',
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
};

const justifyContentMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  around: 'space-around',
  between: 'space-between',
};

const spaceSizeMap = {
  small: 8,
  middle: 16,
  large: 24,
};

export const FlexBox = React.memo(function FlexBox(props: FlexBoxProps) {
  const {
    align,
    justifyContent = 'start',
    direction = 'horizontal',
    wrap = false,
    block = false,
    size = 'middle',
    className,
    children,
  } = props;

  const childNodes = useMemo(() => toArray(children, { keepEmpty: true }), [children]);

  const nodes = useMemo(() => {
    return childNodes.map((child, i) =>
      block ? (
        child
      ) : (
        // eslint-disable-next-line react/no-array-index-key
        <Item key={'item' + i}>{child}</Item>
      ),
    );
  }, [block, childNodes]);

  const flexBoxStyle = useMemo(() => {
    return {
      flexDirection: directionStyleMap[direction],
      alignItems: align ? alignStyleMap[align] : undefined,
      justifyContent: justifyContentMap[justifyContent],
      flexWrap: wrap ? 'wrap' : undefined,
      gap: !block ? spaceSizeMap[size] : undefined,
    } as React.CSSProperties;
  }, [align, block, direction, justifyContent, size, wrap]);

  return (
    <div className={`${styles.flex_box} ${className}`} style={flexBoxStyle}>
      {nodes}
    </div>
  );
});
