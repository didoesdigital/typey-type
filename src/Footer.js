import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p className="text-center mb1 mt1"><small><Link to="/about">About</Link></small></p>
        <p className="text-center mb1 mt1"><small>Email: <a href="mailto:typeytype@didoesdigital.com" className="link-missing-full-stop">typeytype@didoesdigital.com</a></small></p>
        <p className="text-center mb1 mt1"><small>Made with <span aria-label="love" role="img">❤️</span> by <a href="https://twitter.com/didoesdigital">@DiDoesDigital</a>.</small></p>
      </footer>
    )
  }
}

export default Footer;
