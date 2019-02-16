import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

class LessonOverview extends Component {
  componentDidMount() {
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
            <div className="mx-auto mw-1024 p3">
              <div role="article" className="lesson-canvas panel mw-1024 p2 fill-fade-parent mb3">
                <div className="mx-auto mw100 mt10 text-center">
                  <h3>Overvieeeeew</h3>
                  <p>This lesson teaches you X…</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </DocumentTitle>
    )
  }
}

export default LessonOverview;
