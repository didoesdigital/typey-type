import React, { Component } from 'react';
import Scores from 'components/Scores';
import './App.css';

class Finished extends Component {
  render() {
    return (
      <div>
        <h1>Finished!</h1>
        <Scores timer={this.props.timer} totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}/>
      </div>
    )
  }

}

export default Finished;
