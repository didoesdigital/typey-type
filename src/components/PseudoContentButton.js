import React, { Component } from 'react';
import Clipboard from 'clipboard';
import GoogleAnalytics from 'react-ga';

class PseudoContentButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard('.js-clipboard-button');

    this.setState({clicked: false});
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  animatedPseudoContent(event) {
    if (this.props.onClick) {
      this.props.onClick();
    }
    this.setState({clicked: true}, () => {
      let timeoutID = window.setTimeout(() => {
        this.setState({clicked: false});
        window.clearTimeout(timeoutID);
      }, 1000);
    });

    let target = this.props.dataClipboardTarget;
    if (target === '#js-metwords-from-typey-type') { target = 'Copied progress to clipboard'; }
    if (target === '#js-custom-lesson-dictionary-entries') { target = 'Copied custom lesson to clipboard'; }
    if (target === '#js-your-words-for-dictionary-entries') { target = 'Copied your words to clipboard'; }

    if (target && target.includes("Copied progress")) {
      GoogleAnalytics.event({
        category: 'Progress',
        action: 'Copied progress',
        label: 'Target: ' + target
      });
    }
    else if (target && target.includes("Copied")) {
      GoogleAnalytics.event({
        category: 'Copy button',
        action: 'Click',
        label: 'Target: ' + target
      });
    }
    else if (target) {
      GoogleAnalytics.event({
        category: 'Button',
        action: 'Click',
        label: 'Target: ' + target
      });
    }
    else if (this.props.children === "Load progress from text" || this.props.children === "Load") {
      // already handled by Progress.js restoreButtonOnClickFunction() {}
    }
    else {
      GoogleAnalytics.event({
        category: 'Button',
        action: 'Click',
        label: 'Target: NO_TARGET'
      });
    }
  }

  render () {
    return (
      <button className={this.props.className + (this.state.clicked ? ' fade-out-up' : '')} data-clipboard-target={this.props.dataClipboardTarget} onClick={this.animatedPseudoContent.bind(this)} style={this.props.style || {}}>
        {this.props.children}
      </button>
    );
  }
}

export default PseudoContentButton;
