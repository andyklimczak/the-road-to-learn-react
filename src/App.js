import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search.js';
import Table from './Table.js';
import Button from './Button.js';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const DEFAULT_PAGE = 0;
const PARAM_PAGE = 'page=';
const DEFAULT_HPP = '100';
const PARAM_HPP = 'hitsPerPage=';

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
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  onSearchSubmit(event) {
    const { query } = this.state;
    this.fetchSearchTopstories(query, DEFAULT_PAGE);
    event.preventDefault();
  }
  onSearchChange(event) {
    this.setState({query: event.target.value});
  }
  setSearchTopstories(result) {
    const { hits, page } = result;
    const oldHits = page === 0 ? [] : this.state.result.hits;
    const updatedHits = [...oldHits, ...hits];
    this.setState({ result: { hits: updatedHits, page } });
  }
  fetchSearchTopstories(query, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    const { query, result } = this.state;
    this.fetchSearchTopstories(query, DEFAULT_PAGE);
  }
  render() {
    const { query, result } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={query} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        { result && <Table list={result.hits} /> }
        <Button onClick={() => this.fetchSearchTopstories(query, page + 1)}>
          More
        </Button>
      </div>
    );
  }
}

export default App;
