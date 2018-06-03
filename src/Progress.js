import React, { Component } from 'react';
import Clipboard from 'clipboard';

class Progress extends Component {
  componentDidMount() {
    new Clipboard('.js-clipboard-button');
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  restoreButtonOnClickFunction() {
    this.props.setPersonalPreferences(document.querySelectorAll(".js-metwords-from-personal-store")[0].value);
  };

  render () {
    let lessonsProgressFromTypeyType = JSON.stringify(this.props.flashcardsProgress);
    let metWordsFromTypeyType = JSON.stringify(this.props.metWords);
    let wordCount = Object.keys(this.props.metWords).length || 0;
    let progressPercent = Math.round(Object.keys(this.props.metWords).length / 10000 * 100) || 0;
    return (
      <div>
        <main id="main">
          <div className="subheader">
            <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1">
                <header className="flex items-baseline">
                  <h2 id="progress" ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Progress</h2>
                </header>
              </div>
            </div>
          </div>
          <div className="progress-layout p3 mx-auto mw-1024">

            <div className="mw-584">
              <p>You’ve successfully typed {wordCount} words without misstrokes. You’re {progressPercent}% of the way to 10,000 words.</p>
              <h3>Lessons progress</h3>
              {// <p id="js-lessons-progress-from-typey-type" className="w-100 mt3 mb3 quote wrap">{lessonsProgressFromTypeyType}</p>
                }
                <ul class="unstyled-list">
                  <li><ol>Fundamentals:
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-simple-keys/">One-syllable words with simple keys</a> 25 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-more-consonants/">One-syllable words with more consonants</a> 178 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-f-as-v-or-s/">One-syllable words with F as V or S</a> 2944 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-unstressed-vowels/">One-syllable words with unstressed vowels</a> 529 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-inversion/">One-syllable words with inversion</a> 98 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-short-i-vowel/">One-syllable words with short I vowel</a> 92 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-short-vowels/">One-syllable words with short vowels</a> 137 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-long-vowels/">One-syllable words with long vowels</a> 294 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-diphthongs/">One-syllable words with diphthongs</a> 29 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-vowel-disambiguators/">One-syllable words with vowel disambiguators</a> 159 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-left-hand-consonants-with-multiple-keys/">One-syllable words with left-hand consonants with multiple keys</a> 137 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-right-hand-consonants-with-multiple-keys/">One-syllable words with right-hand consonants with multiple keys</a> 294 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-digraphs/">One-syllable words with digraphs</a> 164 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-compound-clusters/">One-syllable words with compound clusters</a> 23 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/one-syllable-words-with-multiple-strokes/">One-syllable words with multiple strokes</a> 36 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/multi-syllable-words-with-briefs/">Multi-syllable words with briefs</a> 25 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/multi-syllable-words-with-prefixes/">Multi-syllable words with prefixes</a> 25 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/multi-syllable-words-with-suffixes/">Multi-syllable words with suffixes</a> 25 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/multi-syllable-words-with-multiple-strokes/">Multi-syllable words with multiple strokes</a> 25 words</li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/fundamentals/fingerspelling/">Fingerspelling</a> 25 words</li>
                  </ol></li>
                  <li><ol>Drills:
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/top-10000-project-gutenberg-words/">Top 10000 Project Gutenberg Words</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/top-10000-english-words/">Top 10000 English Words</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/longest-words/">Longest Words</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/common-words/">Common words</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/single-stroke-briefs/">Single-stroke briefs</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/apostrophes/">Apostrophes</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/email-salutations-and-complimentary-closings/">Email Salutations and Complimentary Closings</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/homophones/">Homophones</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/pronouns/">Pronouns</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/pronouns-continued/">Pronouns continued</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/pronouns-contractions/">Pronouns and Contractions</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/titles/">Titles</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/calendar/">Calendar</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/time/">Time</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/emotions/">Emotions</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/superlatives/">Superlatives</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/fr-fer/">FR: -fer</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/fr-ver/">FR: -ver</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/prefixes/">Prefixes</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/suffixes/">Suffixes</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/two-letter-words-common/">Two Letter Words: Common</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/two-letter-words-rare/">Two Letter Words: Rare</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/drills/steno-party-tricks/">Steno party tricks</a></li>
                  </ol></li>
                  <li><ol>Collections:
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/collections/user-experience/ux-vocabulary/">UX design vocabulary</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/collections/tech/jquery/">Tech</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/collections/tech/jquery/">Medical</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/collections/tech/jquery/">HR</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/collections/tech/jquery/">Two word briefs</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/collections/tech/jquery/">Two-key briefs</a></li>
                  </ol></li>
                  <li><ol>Stories:
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/stories/charles-perrault/the-fairy/">Charles Perrault</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/stories/hans-christian-andersen/the-ugly-duckling/">Hans Christian Andersen</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/stories/grimm/lily-and-the-lion/">Grimm</a></li>
                    <li class="unstyled-list-item"><a href="/typey-type/lessons/stories/fables/the-lion-in-love/">Aesop's fables</a></li>
                  </ol></li>
                </ul>

              <p>Words you’ve seen and times you’ve typed them well:</p>
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
        </main>
      </div>
    )
  }
}

export default Progress;
