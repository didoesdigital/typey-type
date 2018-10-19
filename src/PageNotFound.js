import React from 'react';
import {
  Link
} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <a href="#main" className="skip-to-main-link link-button link-button-ghost">Skip to main content</a>
      <div className="header" role="banner">
        <div className="mx-auto mw-1024 p3">
          <nav>
            <div className="site-heading-banner">
              <Link to="/" className="heading-link dib"><h1>Typey&nbsp;Type</h1></Link>
            </div>
          </nav>
        </div>
      </div>
      <main id="main" className="p3 mx-auto mw-1024">
        <h1 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">That page doesn't exist</h1>
        <p>Try one of these instead:</p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/lessons">Lessons</Link></li>
          <li><Link to="/lessons/drills/top-100-words/">Top 100 Words</Link></li>
          <li><Link to="/support">Help and about</Link></li>
          <li><Link to="/contribute">Contribute to Typey&nbsp;Type</Link></li>
          <li><Link to="/progress">Your progress</Link></li>
        </ul>
      </main>
    </div>
  )
}

export default PageNotFound;
