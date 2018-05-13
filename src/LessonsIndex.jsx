import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LessonsIndex extends Component {

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    const linkList = this.props.lessonIndex.map( (lesson) => {
      let lessonsubtitle = '';
      if (lesson.subtitle.length > 0) {
        lessonsubtitle = ': '+lesson.subtitle;
      }
      return(
        <li className="unstyled-list-item" key={ lesson.path }>
          <Link to={`${this.props.match.url}${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--lesson-index-'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lessonsubtitle}</Link>
        </li>
      )
    });

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Lessons</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <p><Link to={`${this.props.match.url}/custom`.replace(/\/{2,}/g,'/')} id="ga--lesson-index--custom">Create a custom lesson</Link></p>
          <ul className="unstyled-list">{linkList}</ul>
        </div>
      </main>
    )
  }
}

export default LessonsIndex;
