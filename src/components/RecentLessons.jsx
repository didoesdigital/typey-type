import React, { Component } from 'react';
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
      const linkList = this.props.lessonIndex
        .filter( lesson => this.props.recentLessonHistory.find(i => i.path.replace("/lessons", "") === lesson.path))
        .map( (lesson) => {
          let lessonsubtitle = '';
          if (lesson.subtitle && lesson.subtitle.length > 0) {
            lessonsubtitle = ': '+lesson.subtitle;
          }
          return(
            <li className="unstyled-list-item mb1" key={ lesson.path }>
              <Link to={process.env.PUBLIC_URL + "/lessons" + lesson.path.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--recent-lessons--'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lessonsubtitle}</Link>
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
