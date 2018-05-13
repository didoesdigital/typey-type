import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isFirstVisit } from './typey-type';

class Home extends Component {
  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render () {
    // let firstVisit;
    // if (isFirstVisit()) {
    //   firstVisit = "If this is your first visit to Typey type, be sure to customise your settings in the first lesson before you start typing.";
    // } else {
    //   firstVisit = "";
    // }

    return (
      <div>
        <main id="main">
          <div className="subheader">
            <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1">
                <header className="flex items-baseline">
                  <h2 id="home-typey-type-for-stenographers" ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Typey type for stenographers</h2>
                </header>
              </div>
            </div>
          </div>
          <div className="strapline text-vertical p0 m0 lh-single">Typey type for stenographers</div>
          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584">
                <h3 className="tiny-rule">What is this?</h3>
                <p>The process of writing shorthand is called <strong>stenography</strong>. Want to write over 100 words per minute? Grab yourself a fancy keyboard and start learning stenography!</p>
                <p>Typey&nbsp;type for stenographers is a typing app designed specifically to help <abbr title="stenography">steno</abbr> students practice and rapidly master stenography.</p>
                <Link to='/support' className="link-button dib" style={{lineHeight: 2}} role="button">Learn more</Link>
              </div>
            </div>
          </div>
          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584 ml-auto text-right">
                <h3>Steno students</h3>
                <p>After learning a little bit of steno theory, check out Typey&nbsp;type’s fundamental <a href="/lessons/">lessons</a>, starting with <a href="/lessons/fundamentals/one-syllable-words-with-simple-keys/">one-syllable words with simple keys</a>. Before you start typing, customise “your settings” so spaces match your steno settings: spaces before words, spaces after words, or ignore spaces completely.</p>
                <Link to='/lessons/fundamentals/one-syllable-words-with-simple-keys/' className="link-button dib" style={{lineHeight: 2}} role="button">Start typing</Link>
              </div>
            </div>
          </div>
          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584">
                <h3 class="overline">Discover</h3>
                <p>Discover 5–15 new briefs a day from various lessons, revealing their strokes as you learn to write them. Write them slowly, concentrating on accuracy and forming good habits around how you stroke word parts.</p>
                <Link to='/lessons/fundamentals/one-syllable-words-with-simple-keys/' className="link-button dib" style={{lineHeight: 2}} role="button">Discover</Link>
              </div>
            </div>
          </div>
          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584 ml-auto text-right">
                <h3 class="overline">Revise</h3>
                <p>Revise 100 briefs a day from a lesson with loads of words you want to memorise, like the top 10000 English words. Try to recall the briefs before revealing their strokes. Avoid fingerspelling or writing out the long forms of words, so you can memorise the best brief for every word. </p>
                <Link to='/lessons/drills/top-10000-project-gutenberg-words/' className="link-button dib" style={{lineHeight: 2}} role="button">Revise</Link>
              </div>
            </div>
          </div>
          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584">
                <h3 class="overline">Drill</h3>
                <p>Regularly drill common words to build up your muscle memory and test your skills. Write as fast and furiously as you can, aiming for a high speed score. Pick specific drills that focus on a certain kind of brief or many similar words so you can associate them together.</p>
                <Link to='/lessons/drills/pronouns/' className="link-button dib" style={{lineHeight: 2}} role="button">Drill</Link>
              </div>
            </div>
          </div>
          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584 ml-auto text-right">
                <h3 class="overline">Practice</h3>
                <p>Finally, practice longer lessons to mimic real usage as closely as possible. Write as fast as you can without causing misstrokes. Explore classic stories that use simple sentences and common words.</p>
                <Link to='/lessons/stories/fables/belling-the-cat/' className="link-button dib" style={{lineHeight: 2}} role="button">Practice</Link>
              </div>
            </div>
          </div>
          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584">
                <h3>Track your progress</h3>
                <p>Typey&nbsp;type tracks your progress automatically without signing in. To keep your progress safe, however, you need to save it out of Typey&nbsp;type regularly.</p>
                <Link to='/progress/' className="link-button dib" style={{lineHeight: 2}} role="button">Your progress</Link>
              </div>
            </div>
          </div>
          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584 ml-auto text-right">
                <h3 className="tiny-rule--adjacent">Custom material</h3>
                <p>Practice any text you like. Paste in a word list to create a custom lesson using Plover theory, or paste in words and strokes to use your own theory and material.</p>
                <Link to='/lessons/custom' className="link-button dib" style={{lineHeight: 2}} role="button">Custom lessons</Link>
              </div>
            </div>
          </div>
          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="mw-584">
                <h3>Want to get involved?</h3>
                <p>Support DiDoesDigital, create lessons, or share your feedback. Every bit helps.</p>
                <Link to='/contribute/' className="link-button dib" style={{lineHeight: 2}} role="button">Contribute</Link>
              </div>
            </div>
          </div>
          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="text-center">
                <h3 id="steno-news">Keep up with news</h3>
                <p>Sign up for <a href="https://didoesdigital.com/#newsletter" target="_blank" rel="noopener noreferrer">Typey&nbsp;type updates and steno news<span className="external-link" aria-label=" (External link)" title="(External link)"></span></a>.</p>
                <Link to='https://didoesdigital.com/#newsletter' className="link-button dib" style={{lineHeight: 2}} role="button">Steno news</Link>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="p3 mx-auto mw-1024">
              &nbsp;
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Home;
