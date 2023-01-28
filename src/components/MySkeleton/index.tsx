import { Skeleton } from '@nutui/nutui-react';
import React, { Fragment } from 'react';

import styles from './skeleton.module.scss';

export const MySkeleton = React.memo(function MySkeleton(props: { blocks: number; rows: number }) {
  const { blocks, rows } = props;
  const blockArr: number[] = [];
  for (let i = 0; i < blocks; i++) {
    blockArr.push(i + 1);
  }

  return (
    <Fragment>
      {blockArr?.map((index) => {
        return (
          <div className={styles.item_box} style={{ padding: '10px' }} key={index}>
            <Skeleton width="calc(100vw - 80px)" height="25px" animated title row={rows} />
          </div>
        );
      })}
    </Fragment>
  );
});
