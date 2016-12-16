import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Table = ({list}) =>
  <div className="table">
    { list.map(item => {
      return (
        <div key={item.objectId} className="table-row">
          <span style={{ width: '40%' }}><a href={item.url}>{item.title}</a></span>
          <span style={{ width: '30%' }}>{item.author}</span>
          <span style={{ width: '15%' }}>{item.num_comments}</span>
          <span style={{ width: '15%' }}>{item.points}</span>
        </div>
      );
    })}
  </div>

export default Table;
