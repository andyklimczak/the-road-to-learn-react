import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search.js';
import Table from './Table.js';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=?';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      query: DEFAULT_QUERY
    };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onSearchChange(event) {
    this.setState({query: event.target.value});
  }
  setSearchTopstories(result) {
    this.setState({result});
  }
  fetchSearchTopstories(query) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    const { query, result } = this.state;
    this.fetchSearchTopstories(query);
  }
  render() {
    const { query, result } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={query} onChange={this.onSearchChange} >
            Search
          </Search>
        </div>
        { result ? <Table list={result.hits} pattern={query} /> : null }
      </div>
    );
  }
}

export default App;
