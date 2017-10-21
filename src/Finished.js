import React, { Component } from 'react';
import Scores from './Scores';
import './App.css';

class Finished extends Component {
  render() {
    return (
      <div className="app">
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
