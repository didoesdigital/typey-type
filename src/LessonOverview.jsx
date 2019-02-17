import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link, Redirect } from 'react-router-dom';

class LessonOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: `
                <div className="mx-auto mw100 mt10 text-center">
                  <h3>Overview</h3>
                  <p>This lesson teaches you X…</p>
                </div>
      `,
      error: false
    }
  }

  componentDidMount() {
    if (!this.props.lesson || this.props.lesson.title === 'Steno') {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname.replace('overview','lesson.txt'));
    }

    // This logic to find lesson in index is duplicated in Lesson.jsx
    let lessonMetadata;
    lessonMetadata = this.props.lessonIndex.find(metadataEntry => process.env.PUBLIC_URL + '/lessons' + metadataEntry.path === process.env.PUBLIC_URL + this.props.lesson.path);
    if (lessonMetadata && lessonMetadata['overview']) {
      this.getLessonOverview('/lessons' + lessonMetadata['overview']).then((text) => {
        this.setState({content: text});
      }).catch((e) => {
        this.setState({error: true});
        console.log(e);
      });
    } else {
      this.setState({error: true});
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
    if (this.state.error) {
      return <Redirect to={this.props.location.pathname.replace('overview','')} />
    }

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
            <div className="mx-auto mw-1024 p3">
              <div role="article" className="panel mw-1024 p2 mb3">
                <div dangerouslySetInnerHTML={this.showLessonOverview()} />
              </div>
            </div>
          </div>
        </main>
      </DocumentTitle>
    )
  }
}

export default LessonOverview;
