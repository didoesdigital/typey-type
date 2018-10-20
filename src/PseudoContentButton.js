import React, { Component } from 'react';
import Clipboard from 'clipboard';

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
  }

  render () {
    return (
      <button className={this.props.className + (this.state.clicked ? ' fade-out-up' : '')} data-clipboard-target={this.props.dataClipboardTarget} onClick={this.animatedPseudoContent.bind(this)}>
        {this.props.children}
      </button>
    );
  }
}

export default PseudoContentButton;
