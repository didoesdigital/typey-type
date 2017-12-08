import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Lesson from './Lesson';

const Lessons = ({match, lessonIndex, handleLesson, lesson, ...lessonProps}) => {
  const linkList = lessonIndex.map( (lesson) => {
    let lessonsubtitle = '';
    if (lesson.subtitle.length > 0) {
      lessonsubtitle = ': '+lesson.subtitle;
    }
    return(
      <li className="unstyled-list-item" key={ lesson.path }>
        <Link to={`${match.url}${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')}>{lesson.title}{lessonsubtitle}</Link>
      </li>
    )
  });

  return(
    <div>
      <Switch>
        <Route path={`${match.url}/:category/:subcategory/:lessonPath`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
          } />
        <Route path={`${match.url}/drills/:lessonPath`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
          } />
        <Route exact={true} path={match.url} render={() => (
          <div>
            <div className="p4">
              <h3>Lessons</h3>
              <ul className="unstyled-list">{linkList}</ul>
            </div>
          </div>
          )} />
      </Switch>
    </div>
  )

};

export default Lessons;
