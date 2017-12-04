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
      lessonIndex: []
    };
  }

  componentDidMount() {
    fetchLessonIndex().then((json) => this.setState({ lessonIndex: json }, () => {
      let linkList = this.state.lessonIndex.map( (lesson) => {
        return(
          <li key={ lesson.path }>
            <Link to={`${this.props.match.url}${lesson.path}`}>{lesson.title}</Link>
          </li>
        )
      });
      this.setState({linkList: linkList});
    }));

  }

  render() {
    return(
      <div>

        <Route path={`${this.props.match.url}/:category/:lessonPath`} render={ (props) =>
          <Lesson data={this.state.lessonIndex} {...props} />
        } />
        <Route exact={true} path={this.props.match.url} render={() => (
          <div>
            <div>
              <h3>Lessons</h3>
              <p>Select a lesson:</p>
              <ul>{this.state.linkList}</ul>
            </div>
          </div>
        )} />
      </div>
    )
  }

}

export default Lessons;
