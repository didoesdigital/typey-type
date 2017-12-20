import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p className="text-center mt1 mb0"><small>Made with <span aria-label="love" role="img">❤️</span> by <a href="https://twitter.com/didoesdigital">@DiDoesDigital</a>.</small></p>
        <p className="text-center mb1"><small><Link to="/support">Learn more about Typey type</Link>.</small></p>
      </footer>
    )
  }
}

export default Footer;
