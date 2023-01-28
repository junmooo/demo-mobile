import React from 'react';
import { FormattedMessageFixed, Icon } from '../index';

type NoResultProps = { style?: React.CSSProperties; type?: '404' | '401' };

function filterIconAndMessageIdByType(type: NoResultProps['type']) {
  let iconName = 'no-result';
  let messageId = 'noResult';
  switch (type) {
    case '401':
      iconName = 'unauthorized';
      messageId = 'unauthorized';
      break;
    case '404':
      iconName = 'not-found';
      messageId = 'notFound';
      break;
    default:
      break;
  }
  return {
    iconName,
    messageId,
  };
}

export const NoResult = React.memo(function NoResult(props: NoResultProps) {
  const { style, type } = props;

  const { iconName, messageId } = filterIconAndMessageIdByType(type);

  return (
    <div
      style={{
        padding: '40px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '14px',
        color: '#808080',
        ...style,
      }}
    >
      <Icon name={iconName} size="30px" style={{ marginBottom: '8px' }} />
      <span>
        <FormattedMessageFixed id={messageId} />
      </span>
    </div>
  );
});
