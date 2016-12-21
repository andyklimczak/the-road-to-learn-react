import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button.js';
import classNames from 'classnames';

const Sort = ({sortKey, onSort, activeSortKey, isSortReverse, children}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  );
  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass} type="button">
      { children }
    </Button>
  );
}

export default Sort;
