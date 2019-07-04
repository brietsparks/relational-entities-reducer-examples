import React from 'react';

const FixedScroll = ({ title, children }) => {
  const style = {
    height: '90vh',
    overflow: 'auto',
    border: 'solid 1px #ccc'
  };

  return (
    <div>
      <h2>{title}</h2>

      <div style={style}>
        {children}
      </div>
    </div>
  );
};

export default FixedScroll