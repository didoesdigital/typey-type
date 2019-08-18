import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import { getLessonIndexData } from './../lessonIndexData';

class LessonOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: `
                <div class="mx-auto mw100 pt24 pb24 de-emphasized text-center">
                  <p>Loading…</p>
                </div>
      `,
      error: false
    }
  }

  componentDidMount() {
    if (!this.props.lesson || this.props.lesson.title === 'Steno') {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname.replace('overview','lesson.txt'));
    }

    let lessonMetadata;
    // TODO: avoid fetching again if this.props.lessonIndex already contains all the lessons
    getLessonIndexData().then((lessonIndex) => {
      // This logic to find lesson in index is duplicated in Lesson.jsx
      lessonMetadata = lessonIndex.find(metadataEntry => process.env.PUBLIC_URL + '/lessons' + metadataEntry.path === process.env.PUBLIC_URL + this.props.location.pathname.replace('overview','lesson.txt'));

      if (lessonMetadata && lessonMetadata['overview']) {
        this.getLessonOverview(process.env.PUBLIC_URL + '/lessons' + lessonMetadata['overview']).then((text) => {
          let error = false;

          if (text.toLowerCase().startsWith('<!doctype html>')) { error = true; }

          this.setState({
            content: text,
            error: error
          });

        }).catch((e) => {
          this.setState({error: true});
          console.log(e);
        });
      } else {
        this.setState({error: true});
      }
    }).catch((e) => {
      this.setState({error: true});
    });

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  getLessonOverview(lessonFile) {
    return fetch(lessonFile, {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      return response.text();
    });
  }

  showLessonOverview() {
    return {__html: this.state.content};
  }

  render() {
    return (
      <DocumentTitle title={'Typey Type | Lesson: ' + this.props.lesson.title + ' overview'}>
        <main id="main">
          <div className="subheader">
            <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1 self-center">
                <header className="flex items-baseline">
                  <h2 className="table-cell mr2" ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.props.lesson.title} overview</h2>
                </header>
              </div>
              <div className="flex mxn2">
                <Link to={this.props.location.pathname.replace('overview','')} className="link-button link-button-ghost table-cell mr1" role="button">Back to lesson</Link>
              </div>
            </div>
          </div>
          <div>
            { this.state.error ?
            <div className="mx-auto mw-1024 p3">
              <div role="article" className="mw-1024 mb3 mt3">
                <div className="mx-auto mw100 mt3 mb3 text-center">That overview couldn’t be found. <Link to={this.props.location.pathname.replace('overview','')}>Back to lesson</Link>.</div>
              </div>
            </div>
            : <div className="type-face--sans-serif" dangerouslySetInnerHTML={this.showLessonOverview()} />
            }
          </div>
        </main>
      </DocumentTitle>
    )
  }
}

export default LessonOverview;
