import React, { Component } from 'react';
import Scores from './Scores';
import './App.css';

class Finished extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
          <h2>{this.props.lessonTitle}</h2>
          <h3>{this.props.lessonSubTitle}</h3>
          <nav>
            <ul>
              <li><a href="/lesson.txt" onClick={this.props.getLesson}>Lesson one</a></li>
              <li><a href="/lesson-two.txt" onClick={this.props.getLesson}>Lesson two</a></li>
            </ul>
          </nav>
        </div>
        <div className="main">
          <div className="">
            <h1>Finished!</h1>
            <Scores timer={this.props.timer} totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Finished;
