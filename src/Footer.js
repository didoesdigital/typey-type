import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p className="text-center mb1 mt1"><small><Link to="/support">Help and about Typey type</Link>.</small></p>
        <p className="text-center mb1 mt1"><small>Email: <a href="mailto:typeytype@didoesdigital.com">typeytype@didoesdigital.com</a><span aria-hidden="true" className="link-missing-full-stop">&#8203;</span></small></p>
        <p className="text-center mb1 mt1"><small>Made with <span aria-label="love" role="img">❤️</span> by <a href="https://twitter.com/didoesdigital">@DiDoesDigital</a>.</small></p>
      </footer>
    )
  }
}

export default Footer;
