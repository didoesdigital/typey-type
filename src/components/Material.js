import React, { Component } from 'react';
import {matchSplitText} from './../utils/typey-type';

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

    let blur = "";
    if (this.props.userSettings.blurMaterial) {
      blur = " blur";
    }

    const [matched, unmatched] = matchSplitText(this.props.currentPhrase, this.props.actualText, this.props.settings, this.props.userSettings);
    const nextUpcomingMaterial = this.props.upcomingPhrases.length > 0 ? this.props.upcomingPhrases[0] : '';
    const nextUpcomingClasses = `de-emphasized upcoming-phrases bw-2 b--brand-primary-tint--60 ${nextUpcomingMaterial.includes(' ') ? 'bb-dotted' : ''}`
    const restUpcomingMaterial = this.props.upcomingPhrases.length > 1 ? this.props.upcomingPhrases.slice(1).join(' ') : '';

    return (
      <div className="mb1 nt1">
        <div className="expected">
          <div className="visually-hidden">Matching and unmatching material typed, upcoming words, and previous words:</div>
          <div className="material">
            <pre className="material-pre relative"><div className={"dib current-and-upcoming-phrases" + blur}><strong className="current-phrase-material" tabIndex="0">{spaceAfterOutput}<span className="matched steno-material">{matched}</span><span className="steno-material">{unmatched}</span>{spaceBeforeOutput}</strong><span className={nextUpcomingClasses}>{nextUpcomingMaterial}</span> <span className="de-emphasized upcoming-phrases">{restUpcomingMaterial}{spaceAfterOutput}</span></div><span className="dib de-emphasized completed-phrases">&#8203;{this.props.completedPhrases}</span></pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Material;
