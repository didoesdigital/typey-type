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
        <Route path={`${match.url}/fundamentals/:lessonPath`} render={ (props) =>
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
            <div className="subheader">
              <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
                <div className="flex mr1">
                  <header className="flex items-baseline">
                    <h2>Lessons</h2>
                  </header>
                </div>
              </div>
            </div>
            <div className="p3 mx-auto mw-1024">
              <ul className="unstyled-list">{linkList}</ul>
            </div>
          </div>
          )} />
      </Switch>
    </div>
  )

};

export default Lessons;
