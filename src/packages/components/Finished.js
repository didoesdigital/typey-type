import React, { Component } from 'react';
import Scores from 'components/Scores';
import './App.css';

class Finished extends Component {
  render() {
    var customMessage;
    if (this.props.settings.customMessage) {
      customMessage = <h3 className="custom-message">{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = '';
    }
    return (
      <div>
        {customMessage}
        <div className="content">
          <div className="scores">
            <h1>Finished!</h1>
            <Scores timer={this.props.timer} totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Finished;
