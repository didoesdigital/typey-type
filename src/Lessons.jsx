import React from 'react';
import { Route, Link } from 'react-router-dom';
import Lesson from './Lesson';

const Lessons = ({match,data, handleLesson, lesson}) => {
  const linkList = data.map( (lesson) => {
    let lessonsubtitle = '';
    if (lesson.subtitle.length > 0) {
      lessonsubtitle = ': '+lesson.subtitle;
    }
    return(
      <li key={ lesson.path }>
        <Link to={`${match.url}${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')}>{lesson.title}{lessonsubtitle}</Link>
      </li>
    )
  });

  return(
    <div>

      <Route path={`${match.url}/:category/:subcategory/:lessonPath`} render={ (props) =>
          <Lesson data={data}
            handleLesson={handleLesson}
            lesson={lesson}
            {...props} />
      } />
      <Route path={`${match.url}/drills/:lessonPath`} render={ (props) =>
          <Lesson data={data}
            handleLesson={handleLesson}
            lesson={lesson}
            {...props} />
      } />
      <Route exact={true} path={match.url} render={() => (
        <div>
          <div>
            <h3>Lessons</h3>
            <p>Select a lesson:</p>
            <ul>{linkList}</ul>
          </div>
        </div>
      )} />
    </div>
  )

};

export default Lessons;
