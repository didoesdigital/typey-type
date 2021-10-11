// import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';

class ComponentLoadingFailed extends Component {

  componentDidMount() {
    // Log what failed to load?
    // Sentry.captureException(error, { extra: info });
  }

  render() {
    return <div className="center-all"><p>This component won’t load. Check your Internet connection and try <a href=".">refresh the page</a>.</p></div>;
  }
}

export default ComponentLoadingFailed;
