import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Search = ({value, onChange, children }) =>
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>

export default Search;
