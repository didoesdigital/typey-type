import React, { Component } from 'react';
import './App.css';

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <nav>
            <div role="banner" className="site-heading-banner"><a href="/" className="site-heading-link">Typey type</a></div>
          </nav>
        </div>
        <div className="subheader">
          <h1>{this.props.lessonTitle}</h1>
          <h2>{this.props.lessonSubTitle}</h2>
        </div>
      </div>
    )
  }
}

export default Header;
