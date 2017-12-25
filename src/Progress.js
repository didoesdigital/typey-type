import React, { Component } from 'react';
import Clipboard from 'clipboard';

class Progress extends Component {
  componentDidMount() {
    new Clipboard('.js-clipboard-button');
  }

  restoreButtonOnClickFunction() {
    this.props.setPersonalPreferences(document.querySelectorAll(".js-metwords-from-personal-store")[0].value);
  };

  render () {
    let metWordsFromTypeyType = JSON.stringify(this.props.metWords);
    return (
      <div>
        <div className="mx-auto mw-1024 p3">
          <div className="progress-layout">

            <div className="mw-584">
              <h1>Progress</h1>
              <p>Words you’ve seen and times you’ve typed them without misstrokes:</p>
              <p id="js-metwords-from-typey-type" className="w-100 mt3 mb3 quote wrap">{metWordsFromTypeyType}</p>
            </div>

            <div>
              <div className="panel p3">
                <h2>Save your progress</h2>
                <p>Typey&nbsp;type saves your brief progress in your browser’s local storage.<strong className="bg-danger"> You’ll lose your progress if you clear your browsing data (history, cookies, and cache).</strong> If you share this device with other people or use Typey&nbsp;type across several devices and browsers, you should save your progress elsewhere. Copy your progress to your clipboard and save it in a text file somewhere safe. When you return, enter your progress to load it back into Typey&nbsp;type.</p>
                <p className="text-right mb0">
                  <button className="js-clipboard-button link-button copy-to-clipboard fade-out-up" data-clipboard-target="#js-metwords-from-typey-type">
                    Copy progress to clipboard
                  </button>
                </p>
              </div>

              <div className="panel mt3 p3">
                <h3 className="mt0">Restore your progress</h3>
                <p className="mt3 mb3 lh1">
                  <label htmlFor="metWords-from-personal-store" className="inline-block">Enter your progress here:</label>
                  <textarea
                    id="metwords-from-personal-store"
                    className="js-metwords-from-personal-store db w-100"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    rows="1"
                  />
                </p>
                <p className="text-right mb0">
                  <button onClick={this.restoreButtonOnClickFunction.bind(this)} className="link-button load-progress fade-out-up">
                    Load progress
                  </button>
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Progress;
