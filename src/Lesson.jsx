import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

const Lesson = ({match,data}) => {
  const lessonId = parseInt(match.params.lessonId, 10);
  const lesson = data.find(lesson => lesson.id === lessonId);
  let lessonData;

  if(lesson)
    lessonData = <div>
      <h3> {lesson.name} </h3>
      <p>{lesson.description}</p>
      <hr/>
      <h4>{lesson.status}</h4>  </div>;
  else
    lessonData = <h2> Sorry. Lesson doesnt exist </h2>;

  return (
  <div>
      <div>
         {lessonData}
      </div>
    </div>
  )
}

export default Lesson;
