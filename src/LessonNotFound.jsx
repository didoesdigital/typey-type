import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

class Lesson extends Component {
  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }


  prefillSurveyLink() {
    // fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690="
    let param = "&entry.1202724812&entry.936119214";
    let prefillLesson = 'lesson-not-found';
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillLesson) + param;
    }
  }

  render() {
    // let possibleBetterPath = '';
    // let attemptedPath = '';
    // if (this.props.location && this.props.location.pathname) {
    //   attemptedPath = this.props.location.pathname;
    // }
    // console.log(this.props.location);

    return (
      <DocumentTitle title={'Typey Type | Missing Lesson'}>
        <main id="main">
          <div className="subheader">
            <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1 self-center">
                <header className="flex items-baseline">
                  <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                    <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Lesson not found</h2>
                  </a>
                </header>
              </div>
            </div>
          </div>
          <div className="mx-auto mw-1024 p3">
            <h1 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">That lesson couldn’t be found</h1>
            <p>Try one of these instead:</p>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/lessons">Lessons</Link></li>
              <li><Link to="/lessons/drills/top-100-words/">Top 100 Words</Link></li>
              <li><Link to="/support">Help and about</Link></li>
              <li><Link to="/contribute">Contribute to Typey&nbsp;Type</Link></li>
              <li><Link to="/progress">Your progress</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-center"><a href={this.prefillSurveyLink()} className="text-small mt0" target="_blank" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--lesson--give-feedback">Give feedback (form opens in a new tab)</a></p>
          </div>
        </main>
      </DocumentTitle>
    )
  }
}

export default Lesson;
