import React from 'react';
import styles from './style.module.css';

export type ItemProps = {
  children: React.ReactNode;
};

export default React.memo(function Item(props: ItemProps) {
  const { children } = props;
  return <div className={`${styles.flex_item}`}>{children}</div>;
});
