import React, { Component } from 'react';
// import Material from 'components/Material';
// import TypedText from 'components/TypedText';
// import Scores from 'components/Scores';
import './App.css';

class Header extends Component {
  render() {
    var customMessage;
    if (this.props.settings.customMessage) {
      customMessage = <h4>{this.props.settings.customMessage}</h4>;
    } else {
      customMessage = '';
    }
    return (
      <div className="app-header">
        <nav>
          <div role="banner"><a href="/" className="site-heading">Typey type</a></div>
          <ul>
            <li><a href="/lesson.txt" onClick={this.props.getLesson}>Lesson one</a></li>
            <li><a href="/lesson-two.txt" onClick={this.props.getLesson}>Lesson two</a></li>
            <li><a href="/lesson-three.txt" onClick={this.props.getLesson}>Lesson three</a></li>
          </ul>
        </nav>
        <h1>{this.props.lessonTitle}</h1>
        <h2>{this.props.lessonSubTitle}</h2>
        {customMessage}
      </div>
    )
  }
}

export default Header;
