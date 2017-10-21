import React, { Component } from 'react';
// import Material from './Material';
// import TypedText from './TypedText';
// import Scores from './Scores';
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
        <h1>Typey type</h1>
        <h2>{this.props.lessonTitle}</h2>
        <h3>{this.props.lessonSubTitle}</h3>
        {customMessage}
        <nav>
          <ul>
            <li><a href="/lesson.txt" onClick={this.props.getLesson}>Lesson one</a></li>
            <li><a href="/lesson-two.txt" onClick={this.props.getLesson}>Lesson two</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header;
