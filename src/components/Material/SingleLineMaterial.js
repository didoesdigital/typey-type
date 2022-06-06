import React, { Component } from 'react';
import { matchSplitText } from './../../utils/typey-type';

class SingleLineMaterial extends Component {
  render() {
    const spaceBeforeOutput = this.props.userSettings.spacePlacement === 'spaceAfterOutput' ?  "" : " ";
    const spaceAfterOutput = this.props.userSettings.spacePlacement === 'spaceBeforeOutput' ? "" : " ";

    const [matched, unmatched] = matchSplitText(this.props.currentPhrase, this.props.actualText, this.props.settings, this.props.userSettings);
    const completedPhrasesClasses = "dib de-emphasized fw4 left-0 absolute text-right completed-phrases-transform";
    const currentAndUpcomingPhrasesClasses = `dib current-and-upcoming-phrases${this.props.userSettings.blurMaterial ? " blur-words" : ""}`;
    const nextUpcomingMaterial = this.props.upcomingPhrases.length > 0 ? this.props.upcomingPhrases[0] : '';
    const nextUpcomingClasses = `de-emphasized fw4 text-left bw-2 b--brand-primary-tint--60 ${nextUpcomingMaterial.includes(' ') ? 'bb-dotted' : ''}`
    const restUpcomingMaterial = this.props.upcomingPhrases.length > 1 ? this.props.upcomingPhrases.slice(1).join(' ') : '';

    return (
      <div className="mb1 nt1">
        <div className="expected">
          <div className="visually-hidden">Matching and unmatching material typed, upcoming words, and previous words:</div>
          <div className="material mx-auto">
            <pre className="relative translateX-10px"><span className={completedPhrasesClasses}>{this.props.completedPhrases.join(' ')}&#8203;</span><div className={currentAndUpcomingPhrasesClasses}><strong className="fw7" tabIndex="0"><span className="matched steno-material">{matched}</span><span className="steno-material">{unmatched}</span></strong><span className={nextUpcomingClasses}>&#8203;{spaceBeforeOutput}{nextUpcomingMaterial}</span>{" "}<span className="de-emphasized fw4 text-left">{restUpcomingMaterial}{spaceAfterOutput}</span></div></pre>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleLineMaterial;
