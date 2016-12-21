import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Button = ({onClick, className, children}) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

export default Button;
