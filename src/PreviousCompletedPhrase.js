import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import TransitionGroup from 'react-transition-group/TransitionGroup'
// import CSSTransition from 'react-transition-group/CSSTransition'
import './App.css';

class PreviousCompletedPhrase extends Component {

  render() {
    return (
      <TransitionGroup component={"span"}>
        <CSSTransition
          timeout={5000}
          classNames='fade'
          appear={true}
        >
          <span className="successfully-typed-text">{this.props.previousCompletedPhraseAsTyped}</span>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default PreviousCompletedPhrase;
