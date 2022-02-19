import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import PageLoadingFailed from './PageLoadingFailed';
import PageLoadingPastDelay from './PageLoadingPastDelay';

class PageLoading extends Component {

  render() {
    if (this.props.error) {
      // When the loader has errored
      Sentry.captureException(this.props.error);
      return <PageLoadingFailed />;
    } else if (this.props.timedOut) {
      // When the loader has taken longer than the timeout
      return <div>Taking a long time… <button onClick={ this.props.retry }>Retry</button></div>;
    } else if (this.props.pastDelay) {
      // When the loader has taken longer than the delay
      return <PageLoadingPastDelay />;
    } else {
      // When the loader has just started
      return null;
    }
  }
}

export default PageLoading;
