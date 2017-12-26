import React from 'react';
import {
  Link
} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <main id="main">
      <a href="#main" className="skip-to-main-link link-button link-button-ghost">Skip to main content</a>
      <div className="header" role="banner">
        <div className="mx-auto mw-1024 p3">
          <nav>
            <div className="site-heading-banner">
              <Link to="/#main" className="heading-link dib"><h1>Typey&nbsp;type</h1></Link>
            </div>
          </nav>
        </div>
      </div>
      <main id="main" className="p3 mx-auto mw-1024">
        <h1>That page doesn't exist</h1>
        <p>Try one of these instead:</p>
        <ul>
          <li><Link to="/#main">Home</Link>.</li>
          <li><Link to="/lessons#main">Lessons</Link>.</li>
          <li><Link to="/support#main">Help and about</Link>.</li>
        </ul>
      </main>
    </main>
  )
}

export default PageNotFound;
