import React from 'react';
import { Route, Link } from 'react-router-dom';
import Lesson from './Lesson';

const Lessons = ({match,data}) => {
  const linkList = data.map( (lesson) => {
    return(
      <li key={ lesson.path }>
        <Link to={`${match.url}${lesson.path}`.replace(/lesson\.txt$/,'')}>{lesson.title}</Link>
      </li>
    )
  });

  return(
    <div>

      <Route path={`${match.url}/:category/:lessonPath`} render={ (props) =>
        <Lesson data={data} {...props} />
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
