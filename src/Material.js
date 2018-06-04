import React, { Component } from 'react';
import {matchSplitText} from './typey-type';
import './App.css';

class Material extends Component {
  render() {
    let spaceAfterOutput = " ";
    if (this.props.userSettings.spacePlacement === 'spaceBeforeOutput') {
      spaceAfterOutput = "";
    }
    let spaceBeforeOutput = " ";
    if (this.props.userSettings.spacePlacement === 'spaceAfterOutput') {
      spaceBeforeOutput = "";
    }

    const [matched, unmatched] = matchSplitText(this.props.currentPhrase, this.props.actualText, this.props.settings, this.props.userSettings);
    return (
      <div className="mb1">
        <div className="expected">
          <div className="visually-hidden">Matching and unmatching material typed:</div>
          <div className="material">
            <pre className="material-pre"><div className="dib current-and-upcoming-phrases"><strong className="currentPhrase-material" tabIndex="0">{spaceAfterOutput}<span className="matched steno-material">{matched}</span><span className="steno-material">{unmatched}</span>{spaceBeforeOutput}</strong><span className="de-emphasized upcoming-phrases">{this.props.upcomingPhrases}</span></div><span className="dib de-emphasized completed-phrases">&#8203;{this.props.completedPhrases}</span></pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Material;
