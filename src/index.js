import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import ErrorBoundary from './ErrorBoundary'
import App from './App';
import withTracker from './withTracker';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <DocumentTitle title='Typey Type for Stenographers'>
    <Router basename="/typey-type">
      <ErrorBoundary>
        <Route component={withTracker(App)} />
      </ErrorBoundary>
    </Router>
  </DocumentTitle>,
  document.getElementById('root')
);
