import React from 'react';

const defaultStyle = {
  cursor: 'pointer'
};

export const Remove = ({ onClick, style = {} }) =>
  <span onClick={onClick} style={{ ...defaultStyle, ...style }}>×</span>;

export const MoveUp = ({ onClick, style = {} }) =>
  <span onClick={onClick} style={{ ...defaultStyle, ...style }}>▲</span>;

export const MoveDown = ({ onClick, style = {} }) =>
  <span onClick={onClick} style={{ ...defaultStyle, ...style }}>▼</span>;