import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

const Lesson = ({match,data}) => {
  const lesson = data.find(lesson => '/lessons'+lesson.path === match.url+'lesson.txt');
  let lessonData;

  if(lesson) {
    let lessonsubtitle = '';
    if (lesson.subtitle.length > 0) {
      lessonsubtitle = ': '+lesson.subtitle;
    }

    lessonData = <div>
      <h3>{lesson.title}{lessonsubtitle}</h3>
      <p>{lesson.category}</p>
      <p>{lesson.subcategory}</p>
    </div>;
  } else {
    lessonData = <h2>That lesson is missing.</h2>;
  }

  return (
    <div>
      <div>
        {lessonData}
      </div>
    </div>
  )
}

export default Lesson;
