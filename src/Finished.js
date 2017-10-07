import React, { Component } from 'react';
import Scores from './Scores';
// import matchSplitText from './typey-type';
import './App.css';

class Finished extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
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
