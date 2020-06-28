import React, { Component } from 'react';
import PARAMS from '../utils/params.js';
import { Link } from 'react-router-dom';

class RecentLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasRecentLessons: false
    }
  }

  componentDidMount() {
    let hasRecentLessons = false;
    if (this.props.recentLessonHistory && this.props.recentLessonHistory.length > 0 && this.props.recentLessonHistory[0] && this.props.recentLessonHistory[0].path) {
      hasRecentLessons = true;
    }
    this.setState({
      hasRecentLessons: hasRecentLessons
    });
  }

  render() {
    let recentLessons = null;

    if (this.state.hasRecentLessons) {
      const linkList = this.props.recentLessonHistory
        .filter( recentLesson => this.props.lessonIndex.find(lesson => lesson.path === recentLesson.path.replace("/lessons", "") + 'lesson.txt'))
        .map( recentLesson => {
          let lesson = this.props.lessonIndex.find(lesson => lesson.path === recentLesson.path.replace("/lessons", "") + 'lesson.txt');

          let studyType = "practice";
          // NOTE: does not check if studyType is legit
          if (recentLesson && recentLesson.studyType) { studyType = recentLesson.studyType; }

          return(
            <li className="unstyled-list-item mb1" key={ lesson.path }>
              <Link to={
                "/lessons"
                  + lesson.path
                  .replace(/lesson\.txt$/,'')
                  .replace(/\/{2,}/g,'/')
                  + "?recent=1&"
                  + PARAMS[studyType + "Params"]
                  } id={'ga--recent-lessons--' + lesson.path.replace(/[/.]/g,'-')}>{lesson.title}</Link>
            </li>
          )
        }).reverse();

      recentLessons = (
        <React.Fragment>
          <h3>Recent lessons</h3>
          <ul className="unstyled-list">{linkList}</ul>
        </React.Fragment>
      );
    }

    return (
      this.state.hasRecentLessons ? recentLessons : null
    );
  }
}

export { RecentLessons };
