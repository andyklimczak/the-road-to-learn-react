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
      results: null,
      query: DEFAULT_QUERY,
      searchKey: '',
    };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
  }
  needsToSearchTopstories(query) {
    return !this.state.results[query];
  }
  onSearchSubmit(event) {
    const { query } = this.state;
    this.setState({searchKey: query});
    if(this.needsToSearchTopstories) {
      this.fetchSearchTopstories(query, DEFAULT_PAGE);
    }
    event.preventDefault();
  }
  onSearchChange(event) {
    this.setState({query: event.target.value});
  }
  setSearchTopstories(result) {
    const { hits, page } = result;
    const { searchKey } = this.state;
    const { query } = this.state;
    const oldHits = page === 0 ? [] : this.state.results[searchKey].hits;
    const updatedHits = [...oldHits, ...hits];
    this.setState({ results: { ...this.state.results, [searchKey]: { hits: updatedHits, page } } });
  }
  fetchSearchTopstories(query, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    const { query, result } = this.state;
    this.setState({ searchKey: query });
    this.fetchSearchTopstories(query, DEFAULT_PAGE);
  }
  render() {
    const { query, results, searchKey } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div className="page">
        <div className="interactions">
          <Search value={query} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        <Table list={list} />
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;

export { Button, Search, Table };
