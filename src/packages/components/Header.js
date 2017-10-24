import React, { Component } from 'react';
// import Material from 'components/Material';
// import TypedText from 'components/TypedText';
// import Scores from 'components/Scores';
import './App.css';

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <nav>
            <div role="banner" className="site-heading-banner"><a href="/" className="site-heading-link">Typey type</a></div>
            <ul>
              <li><a href="/lesson-one.txt" onClick={this.props.getLesson}>Lesson one</a></li>
              <li><a href="/lesson-two.txt" onClick={this.props.getLesson}>Lesson two</a></li>
              <li><a href="/lesson-three.txt" onClick={this.props.getLesson}>Lesson three</a></li>
            </ul>
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
