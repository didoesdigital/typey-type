import React, { Component } from 'react';
import Clipboard from 'clipboard';
import { IconCheckmark } from './Icon';
import { Link } from 'react-router-dom';
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'

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
    let lessonsProgressFromTypeyType = this.props.lessonsProgress;
    const linkList = this.props.lessonIndex.map( (lesson) => {
      let lessonsubtitle = '';
      let lessonWordCount = 0;
      let lessonWordCountInIndex = '';
      let numberOfWordsSeen = 0;
      let lessonCompletion;
      if (lesson.subtitle.length > 0) {
        lessonsubtitle = ': '+lesson.subtitle;
      }
      if (lesson.wordCount && lesson.wordCount > 0) {
        lessonWordCount = lesson.wordCount;
        lessonWordCountInIndex = '' + lessonWordCount;
      }
      if (lessonsProgressFromTypeyType && lessonsProgressFromTypeyType["/lessons" + lesson.path]) {
        numberOfWordsSeen = lessonsProgressFromTypeyType["/lessons" + lesson.path].numberOfWordsSeen;
        if ((numberOfWordsSeen >= lessonWordCountInIndex) || (numberOfWordsSeen > 100)) {
          lessonCompletion = (
            <Tooltip
              title="100 words done or lesson complete"
              className=""
              animation="shift"
              arrow="true"
              duration="200"
              tabIndex="0"
              tag="span"
              theme="didoesdigital"
              trigger="mouseenter focus click"
              onShow={this.props.setAnnouncementMessage}
            >
              <IconCheckmark role="img" className="svg-icon-wrapper svg-baseline color-green-bright" iconTitle="" />
              <span className="visually-hidden">100 words done or lesson complete</span>
            </Tooltip>
          );
        } else if (numberOfWordsSeen > 0) {
          lessonCompletion = ( <small className="ml1">Started</small> );
          // lessonCompletion = (
          //       <Tooltip
          //         title="In progress"
          //         className=""
          //         animation="shift"
          //         arrow="true"
          //         duration="200"
          //         tabIndex="0"
          //         tag="span"
          //         theme="didoesdigital"
          //         trigger="mouseenter focus click"
          //         onShow={this.props.setAnnouncementMessage}
          //       >
          //         <IconCheckmark ariaHidden="true" role="presentation" iconFill="#8242a8" className="svg-icon-wrapper svg-baseline" iconTitle="" />
          //       </Tooltip>
          // );
        }
      }
      if (lesson.category === "Fundamentals") {
        return(
          <li className="unstyled-list-item mb1" key={ lesson.path }>
            <Link to={`/lessons${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--lesson-index-'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lessonsubtitle}</Link> {lessonCompletion}
            { // <!-- {numberOfWordsSeen} words seen of {lessonWordCountInIndex}-->
            }
          </li>
        )
      } else {
        return "";
      }
    });

    let metWordsFromTypeyType = JSON.stringify(this.props.metWords);
    let yourWordCount = Object.keys(this.props.metWords).length || 0;
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
          <div className="progress-layout pl3 pr3 pt3 mx-auto mw-1024">
            <div className="panel p3 mb3">
              <h2>Save your progress</h2>
              <p>Typey&nbsp;type saves your brief progress in your browser’s local storage.<strong className="bg-danger"> You’ll lose your progress if you clear your browsing data (history, cookies, and cache).</strong> If you share this device with other people or use Typey&nbsp;type across several devices and browsers, you should save your progress elsewhere. Copy your progress to your clipboard and save it in a text file somewhere safe. When you return, enter your progress to load it back into Typey&nbsp;type.</p>
              <p className="mb0">
                <button className="js-clipboard-button link-button copy-to-clipboard fade-out-up" data-clipboard-target="#js-metwords-from-typey-type">
                  Copy progress to clipboard
                </button>
              </p>
            </div>

            <div className="panel p3 mb3">
              <h2 className="mt0">Load your progress</h2>
              <p className="mt2 mb3">
                Restore your progress from a previous session by entering your saved progress and loading it into Typey&nbsp;type. You can also clear your progress by loading in empty curly braces, <code>{"{}"}</code>.
              </p>
              <p className="mt4 mb0">
                <label htmlFor="metWords-from-personal-store" className="inline-block mb05">Enter your progress here:</label>
                <textarea
                  id="metwords-from-personal-store"
                  className="js-metwords-from-personal-store db w-100"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  rows="2"
                />
              </p>
              <p className="mt2 mb0">
                <button onClick={this.restoreButtonOnClickFunction.bind(this)} className="link-button load-progress fade-out-up">
                  Load progress into Typey&nbsp;type
                </button>
              </p>
            </div>
          </div>

          <div className="p3 mx-auto mw-1024">
            <h2>Your progress</h2>
            <p>You’ve successfully typed {yourWordCount} words without misstrokes. You’re {progressPercent}% of the way to 10,000 words.</p>

            <h3>Fundamental lessons progress</h3>
            <ul className="unstyled-list">{linkList}</ul>

            <h3>Vocabulary progress</h3>
            <p>Words you’ve seen and times you’ve typed them well:</p>
            <p id="js-metwords-from-typey-type" className="w-100 mt3 mb3 quote wrap"><small>{metWordsFromTypeyType}</small></p>
          </div>
        </main>
      </div>
    )
  }
}

export default Progress;
