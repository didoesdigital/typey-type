import React from 'react';

const Contribute = () => {
  return (
    <main id="main">
      <div className="subheader">
        <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
          <div className="flex mr1">
            <header className="flex items-baseline">
              <h2 id="contribute-to-typey-type">Contribute to Typey&nbsp;type</h2>
            </header>
          </div>
        </div>
      </div>
      <div className="p3 mx-auto mw-1024">
        <div className="mw-568">
          <p>Thanks for your interest in Typey&nbsp;type!</p>

          <h3 id="patreon">Patreon</h3>
          <p>You can support my efforts on <a href="https://www.patreon.com/didoesdigital" target="_blank" rel="noopener noreferrer">Patreon<span className="external-link" aria-label=" (External link)" title="(External link)"></span></a>. A monthly donation helps me build more lessons and features to help you fast-track your steno progress.</p>

          <h3 id="lessons">Lessons</h3>
          <p>If you have an idea for an awesome new lesson you’d like to write, <a href="mailto:typeytype@didoesdigital.com">email typeytype@didoesdigital.com</a> or <a href="https://twitter.com/didoesdigital">tweet @DiDoesDigital</a>.</p>
        </div>
      </div>
    </main>
  )
}

export default Contribute;
