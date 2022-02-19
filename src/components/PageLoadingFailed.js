import React, { Component } from 'react';

class PageLoadingFailed extends Component {
  render() {
    return <div className="mh-page"><div className="center-all"><p>This page won’t load. Check your Internet connection and try <a href=".">refresh the page</a>.</p></div></div>;
  }
}

export default PageLoadingFailed;
