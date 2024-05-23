import React from 'react';
import MarkedView from './markedView';
import RawView from './rawView';

export default ({ showMarkedView, ...otherProps }) => {
  if (!showMarkedView)
    return (
      <div className="ann-container">
        <RawView {...otherProps}></RawView>
      </div>
    );

  return <MarkedView {...otherProps}></MarkedView>;
};
