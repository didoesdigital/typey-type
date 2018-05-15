import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Footer extends Component {
  render() {
    let fullscreen = "";
    if (this.props.fullscreen) {
      fullscreen = " fullscreen";
    } else {
      fullscreen = "";
    }
    return (
      <footer role="contentinfo" className={"hide-in-fullscreen" + fullscreen}>
        <p className="text-center mt1 mb0"><small>Made with <span aria-label="love" role="img">❤️</span> by <a href="https://didoesdigital.com/">DiDoesDigital</a>.</small></p>
        <p className="text-center mb0"><small><Link to="/support">Learn more about Typey&nbsp;type</Link> and <Link to="/support#privacy">privacy</Link>.</small></p>
        <p className="text-center mb1"><small><Link to="/contribute">Contribute to Typey&nbsp;type</Link> and <a href="https://didoesdigital.com/#newsletter" target="_blank" rel="noopener noreferrer">sign up to steno news<span className="external-link" aria-label=" (External link)" title="(External link)"></span></a>.</small></p>
      </footer>
    )
  }
}

export default Footer;
