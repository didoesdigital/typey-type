import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';

if (process.env.NODE_ENV !== 'production') {
  // GoogleAnalytics.initialize('UA-113450929-2', { debug: true, titleCase: false });
  GoogleAnalytics.initialize('UA-113450929-2', { titleCase: false });
} else {
  GoogleAnalytics.initialize('UA-113450929-1', { titleCase: false });
}


const withTracker = (WrappedComponent, options = { anonymizeIp: true }) => {
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = process.env.PUBLIC_URL + this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = process.env.PUBLIC_URL + this.props.location.pathname;
      const nextPage = process.env.PUBLIC_URL + nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;
