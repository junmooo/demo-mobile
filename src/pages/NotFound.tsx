import { NoResult } from '@/components';
import React from 'react';

const NotFound = React.memo(function NotFound() {
  return (
    <div>
      <NoResult type="404" />
    </div>
  );
});

export default NotFound;
