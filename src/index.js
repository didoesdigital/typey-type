import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import withTracker from './withTracker';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <Router basename="/typey-type">
    <Route component={withTracker(App)} />
  </Router>,
  document.getElementById('root')
);
