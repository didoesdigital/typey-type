import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';

class LessonsIndex extends Component {

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    const linkList = this.props.lessonIndex.map( (lesson) => {
      let lessonsubtitle = '';
      let wordCount = 0;
      let wordCountInIndex = '';
      if (lesson.subtitle.length > 0) {
        lessonsubtitle = ': '+lesson.subtitle;
      }
      if (lesson.wordCount && lesson.wordCount > 0) {
        wordCount = lesson.wordCount;
        wordCountInIndex = ' · ' + wordCount + ' words';
      }
      return(
        <li className="unstyled-list-item" key={ lesson.path }>
          <Link to={`${this.props.match.url}${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--lesson-index-'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lessonsubtitle}</Link>{wordCountInIndex}
        </li>
      )
    });

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Lessons</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <h3>Custom lessons</h3>
          <p>To help Typey&nbsp;Type grow even faster, add your custom lessons to the{' '}
            <GoogleAnalytics.OutboundLink
              eventLabel="community's lessons"
              to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
              target="_blank">
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
          <p><Link to={`${this.props.match.url}/custom`.replace(/\/{2,}/g,'/')} className="link-button dib"  style={{lineHeight: 2}} id="ga--lesson-index--create-a-custom-lesson">Create a custom lesson</Link></p>
          <h3>Typey&nbsp;Type lessons</h3>
          <ul className="unstyled-list">{linkList}</ul>
        </div>
      </main>
    )
  }
}
            // There are also <Link to="/support#palantype">palantype</Link> lessons available.

export default LessonsIndex;
