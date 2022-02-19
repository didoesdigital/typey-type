import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import ComponentLoadingFailed from './ComponentLoadingFailed';
import ComponentLoadingPastDelay from './ComponentLoadingPastDelay';

class ComponentLoading extends Component {

  render() {
    if (this.props.error) {
      // When the loader has errored
      Sentry.captureException(this.props.error);
      return <ComponentLoadingFailed />;
    } else if (this.props.timedOut) {
      // When the loader has taken longer than the timeout
      return <div>Taking a long time… <button onClick={ this.props.retry }>Retry</button></div>;
    } else if (this.props.pastDelay) {
      // When the loader has taken longer than the delay
      return <ComponentLoadingPastDelay />;
    } else {
      // When the loader has just started
      return null;
    }
  }
}

export default ComponentLoading;
