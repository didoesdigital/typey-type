import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

class Lesson extends Component {
  componentDidMount() {
    const lesson = this.props.data.find(lesson => '/lessons'+lesson.path === this.props.match.url+'lesson.txt');
    let lessonData;

    if(lesson) {
      this.props.handleLesson('/lessons'+lesson.path);
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
  }

  render() {
    return (
      <div>
        <div>
          {this.props.lesson.title}
        </div>
      </div>
    )
  }
}

export default Lesson;
