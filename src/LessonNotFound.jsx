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
    let prefillLesson = this.props.location.pathname;
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillLesson) + param;
    }
  }

  render() {
    let possibleBetterPath = '';
    let attemptedPathLessonTxt = '';
    let possibleBetterLessonTitle = '';
    if (this.props.location && this.props.location.pathname) {
      attemptedPathLessonTxt = this.props.location.pathname + '/lesson.txt';

      if (this.props.lessonIndex && this.props.lessonIndex.length > 0) {
        let length = this.props.lessonIndex.length;
        for (let i = 0; i < length; i++) {
          let tmpBetterPath = '/lessons' + this.props.lessonIndex[i].path;
          if (attemptedPathLessonTxt === tmpBetterPath) {
            possibleBetterPath = process.env.PUBLIC_URL + tmpBetterPath.replace('lesson.txt','');
            possibleBetterLessonTitle = this.props.lessonIndex[i].title;
          }
        }
      }
    }

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
            <p className="mt3">That lesson couldn’t be found. Try one of these instead:</p>
            <ul>
              <li><Link to="/lessons">All lessons</Link></li>
              <li><Link to="/lessons/drills/top-100-words/">Top 100 words lesson</Link></li>
              {possibleBetterPath.length > 0 && <li><Link to={possibleBetterPath}>{possibleBetterLessonTitle} lesson</Link></li>}
            </ul>
            <p>Or <a href={this.prefillSurveyLink()} className="" target="_blank" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--lesson--give-feedback">let me know about this missing lesson (form opens in a new tab)</a></p>
          </div>
        </main>
      </DocumentTitle>
    )
  }
}

export default Lesson;
