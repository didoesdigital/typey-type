import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

const Lesson = ({match,data}) => {
  const lesson = data.find(lesson => lesson.path === '/'+match.params.category+'/'+match.params.lessonPath+'/lesson.txt');
  let lessonData;

  if(lesson)
    lessonData = <div>
      <h3>{lesson.title}</h3>
      <p>{lesson.subtitle}</p>
      <p>{lesson.category}</p>
      <p>{lesson.subcategory}</p>
       </div>;
  else
    lessonData = <h2>That lesson is missing.</h2>;

  return (
    <div>
      <div>
        {lessonData}
      </div>
    </div>
  )
}

export default Lesson;
