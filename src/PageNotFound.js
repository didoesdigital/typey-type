import React from 'react';
import {
  Link
} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <div className="header">
        <div className="mx-auto mw-1024 p3">
          <nav>
            <div className="site-heading-banner">
              <Link to="/" className="heading-link dib"><h1>Typey type</h1></Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="p3 mx-auto mw-1024">
        <h1>That page doesn't exist</h1>
        <p>Try one of these instead:</p>
        <ul>
          <li><Link to="/">Home</Link>.</li>
          <li><Link to="/lessons/">Lessons</Link>.</li>
          <li><Link to="/lessons/drills/top-10000-english-words/">Top 10000 English words</Link>.</li>
          <li><Link to="/support/">Help and about</Link>.</li>
        </ul>
      </div>
    </div>
  )
}

export default PageNotFound;
