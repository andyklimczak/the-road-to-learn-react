import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const isSearched = (query) => (item) => !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;

class Table extends Component {
  render() {
    const { list, pattern } = this.props;
    return (
      <div>
        { list.filter(isSearched(pattern)).map(item => {
          return (
            <div key={item.objectId}>
              <span><a href={item.url}>{item.title}</a></span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Table;
