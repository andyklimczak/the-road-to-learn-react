import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search.js';
import Table from './Table.js';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectId: 0,
  }, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramove, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectId: 1,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      query: '',
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onSearchChange(event) {
    this.setState({query: event.target.value});
  }
  render() {
    const { query, list } = this.state;
    return (
      <div className="App">
        <Search value={query} onChange={this.onSearchChange} >
          Search
        </Search>
        <Table list={list} pattern={query} />
      </div>
    );
  }
}

export default App;
