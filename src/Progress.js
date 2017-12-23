import React from 'react';
import Clipboard from 'clipboard';

const Progress = ( props ) => {
  let metWordsFromTypeyType = JSON.stringify(props.metWords);
  let restoreButtonOnClickFunction = function () {
    props.setPersonalPreferences(document.querySelectorAll(".js-metwords-from-personal-store")[0].value);
  };

  new Clipboard('.js-clipboard-button');

  return (
    <div>
      <div className="mx-auto mw-1024 p3">
        <h1>Progress</h1>
        <p id="js-metwords-from-typey-type" className="w-100">{metWordsFromTypeyType}</p>
        <button className="js-clipboard-button link-button copy-to-clipboard fade-out-up" data-clipboard-target="#js-metwords-from-typey-type">
          Copy progress to clipboard
        </button>
        <p className="mt3 lh1">
          <label htmlFor="metWords-from-personal-store" className="inline-block">Enter your progress here:</label>
          <textarea
            id="metwords-from-personal-store"
            className="js-metwords-from-personal-store db"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            rows="1"
          />
        </p>
        <button onClick={restoreButtonOnClickFunction} className="link-button load-progress fade-out-up">
          Load progress
        </button>
      </div>
    </div>
  )
}

export default Progress;
