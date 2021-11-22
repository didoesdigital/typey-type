import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import { IconExternal } from './Icon';
import LessonList from './LessonList';
import { Tooltip } from 'react-tippy';

class LessonsIndex extends Component {

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Lessons</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="flex flex-wrap justify-between">
            <div>
              <div className="mw-584">
                <h3>Custom lessons</h3>
                <p>To help Typey&nbsp;Type grow even faster, add your custom lessons to the{' '}
                  <GoogleAnalytics.OutboundLink
                    eventLabel="community's lessons"
                    to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    community’s lessons
                    <Tooltip
                      title="Opens in a new tab"
                      animation="shift"
                      arrow="true"
                      className=""
                      duration="200"
                      tabIndex="0"
                      tag="span"
                      theme="didoesdigital"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >
                      <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                    </Tooltip>
                  </GoogleAnalytics.OutboundLink>.
                </p>
                <p>The community lessons include extra topics like spacing, capitalisation, quotations, and using <span className="steno-stroke steno-stroke--subtle px05">SPWER</span> for “inter-”/“enter-” words.</p>
                <p>
                  <Link to={`${this.props.match.url}/custom/setup`.replace(/\/{2,}/g,'/')} className="link-button dib"  style={{lineHeight: 2}} id="ga--lesson-index--create-a-custom-lesson">Create a custom lesson</Link>
                  { this.props.customLesson.title !== "Steno" ? <Link to={`${this.props.match.url}/custom?study=discover&newWords=1&seenWords=1&retainedWords=1&sortOrder=sortOff&startFromWord=1`.replace(/\/{2,}/g,'/')} onClick={this.props.stopLesson} className="dib ml2">Start custom lesson</Link> : null }
                </p>

              </div>

              <h3>Typey&nbsp;Type lessons</h3>
              <LessonList lessonIndex={this.props.lessonIndex} url={this.props.match.url} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}
            // There are also <Link to="/support#palantype">palantype</Link> lessons available.

export default LessonsIndex;
