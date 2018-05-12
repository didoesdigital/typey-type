import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import App from './App';
import withTracker from './withTracker';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <DocumentTitle title='Typey type for stenographers'>
    <Router basename="/typey-type">
      <Route component={withTracker(App)} />
    </Router>
  </DocumentTitle>,
  document.getElementById('root')
);
