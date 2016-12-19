import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Button = ({onClick, children}) =>
  <button onClick={onClick} type="button">
    {children}
  </button>

export default Button;
