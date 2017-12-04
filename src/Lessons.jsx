import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
import { Route, Link } from 'react-router-dom';
import Lesson from './Lesson';
// import './index.css';

const Lessons = ({ match }) => {

  const lessonsIndex = [
    {
      id: 1,
      name: 'test1 name',
      description: 'test1 desc',
      status: 'test1 status'
    },
    {
      id: 2,
      name: 'test2 name',
      description: 'test2 desc',
      status: 'test2 status'
    }
  ];

  let linkList = lessonsIndex.map( (lesson) => {
    return(
      <li key={ lesson.id }>
        <Link to={`${match.url}/${lesson.id}`}>{lesson.name}</Link>
      </li>
      )
  });

  return(
    <div>
      <div>
        <div>
          <h3>Lessons</h3>
          <ul>{linkList}</ul>
        </div>
      </div>

      <Route path={`${match.url}/:lessonId`} render={ (props) =>
        <Lesson data={lessonsIndex} {...props} />
      } />
      <Route exact path={match.url} render={() => (
        <div>Select a lesson.</div>
      )} />
    </div>
  )

}

export default Lessons;
