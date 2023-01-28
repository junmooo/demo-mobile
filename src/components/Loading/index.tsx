import React from 'react';
import './style.module.scss';
import { useIntl } from 'react-intl';
import { Icon } from '@nutui/nutui-react';

export const Loading = React.memo(function Loading(props) {
  const intl = useIntl();
  return (
    <div className="a">
      <Icon name="loading" size="20" />
      <div className="loading">{intl.formatMessage({ id: 'loading' })}</div>
    </div>
  );
});
