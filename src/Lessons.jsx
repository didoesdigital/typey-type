import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Lesson from './Lesson';

const Lessons = ({match, lessonIndex, handleLesson, lesson, ...lessonProps}) => {
  let currentPathname = lessonProps.location.pathname + 'lesson.txt';
  function pathnameIsAValidLesson(lessonObject, index, array) {
    // console.log('/lessons'+lessonObject.path);
    // console.log(currentPathname);
    return '/lessons'+lessonObject.path === currentPathname;
  }
  // let isPathnameAValidLesson = lessonIndex.some(pathnameIsAValidLesson);
  if(lessonIndex.some(pathnameIsAValidLesson)) {
  }

  console.log(lesson);
  const currentLesson = lessonIndex.filter(function(lessonObject){
    return '/lessons'+lessonObject.path === currentPathname;
  });
  if(currentLesson.length>0){
    console.log(currentLesson[0]);
    lesson = currentLesson[0];
  }

  // console.log(lessonProps.location);
  // console.log(lessonIndex);
  // console.log(lessonProps);
  // console.log(match);
  // console.log(match.path);
  // console.log(lessonIndex);
  // console.log(lesson);
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
        <div className="main">
          <div className="p4">
            <h3>Lessons</h3>
            <ul className="unstyled-list">{linkList}</ul>
      </div>
      </div>
      </div>
    )} />
  </Switch>
    </div>
  )

};

export default Lessons;
