import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sort from './Sort.js';
import { sortBy } from 'lodash';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const Table = ({list, sortKey, onSort, isSortReverse }) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
  return (
    <div className="table">
      <div className="table-header">
        <span style={{ width: '40%' }}>
          <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey} isSortReverse={isSortReverse}>Title</Sort>
        </span>
        <span style={{ width: '30%' }}>
          <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={sortKey} isSortReverse={isSortReverse}>Author</Sort>
        </span>
        <span style={{ width: '15%' }}>
          <Sort sortKey={'COMMENTS'} onSort={onSort} activeSortKey={sortKey} isSortReverse={isSortReverse}>Comments</Sort>
        </span>
        <span style={{ width: '15%' }}>
          <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey={sortKey} isSortReverse={isSortReverse}>Points</Sort>
        </span>
      </div>
      { reverseSortedList.map((item, key) => {
        return (
          <div key={key} className="table-row">
            <span style={{ width: '40%' }}><a href={item.url}>{item.title}</a></span>
            <span style={{ width: '30%' }}>{item.author}</span>
            <span style={{ width: '15%' }}>{item.num_comments}</span>
            <span style={{ width: '15%' }}>{item.points}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Table;
