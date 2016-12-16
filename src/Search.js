import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Search = ({value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">{children}</button>
  </form>

export default Search;
