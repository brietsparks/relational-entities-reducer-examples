import React from 'react';
import { noop } from '../../util';


export const Swatch = ({ color, onClick = noop }) => {
  const style = {
    height: 12,
    width: 12,
    display: 'inline-block',
    marginRight: 8,
    cursor: 'pointer',
    backgroundColor: color
  };
  return (
    <span onClick={onClick} style={style}/>
  )
};

export default Swatch;
