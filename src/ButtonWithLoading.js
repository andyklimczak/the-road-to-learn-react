import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loading from './Loading.js';
import Button from './Button.js';

const withLoading = (Component) => ({ isLoading, ...props }) => isLoading ? <Loading /> : <Component { ...props } />;

const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;
