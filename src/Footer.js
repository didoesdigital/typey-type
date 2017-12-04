import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p className="text-center mb1 mt1"><small>Learn more about <a href="https://didoesdigital.com/plover/">stenography and Plover</a>.</small></p>
        <p className="text-center mb1 mt1"><small>Email: <a href="mailto:didoesdigital+steno@gmail.com" className="link-missing-full-stop">DiDoesDigital+Steno@gmail.com</a></small></p>
        <p className="text-center mb1 mt1"><small>Made with <span aria-label="love" role="img">❤️</span> by <a href="https://twitter.com/didoesdigital">@DiDoesDigital</a>.</small></p>
      </footer>
    )
  }
}

export default Footer;
