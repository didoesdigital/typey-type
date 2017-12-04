import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
import { Route, Link } from 'react-router-dom';
import { fetchLessonIndex } from './typey-type';
import Lesson from './Lesson';
// import './index.css';

class Lessons extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      lessonsIndex: []
    };
  }

  componentDidMount() {
    fetchLessonIndex().then((json) => this.setState({ lessonsIndex: json }, () => {
      let linkList = this.state.lessonsIndex.map( (lesson) => {
        return(
          <li key={ lesson.path }>
            <Link to={`${this.props.match.url}/${lesson.path}`}>{lesson.title}</Link>
          </li>
        )
      });
      this.setState({linkList: linkList});
    }));

  }

  render() {
    return(
      <div>
        <div>
          <div>
            <h3>Lessons</h3>
            <ul>{this.state.linkList}</ul>
          </div>
        </div>

        <Route path={`${this.props.match.url}/:lessonId`} render={ (props) =>
          <Lesson data={this.state.lessonsIndex} {...props} />
        } />
        <Route exact path={this.props.match.url} render={() => (
          <div>Select a lesson.</div>
        )} />
      </div>
    )
  }

}

export default Lessons;
