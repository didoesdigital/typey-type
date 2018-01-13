import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import { randomise } from './utils';
import {
  getLesson,
  parseLesson
} from './typey-type';

let paneNodes = function (flashcards) {
  return flashcards.map((item, i) => {
    return (
      <div key={i}>
        <div className="item">{item}</div>
      </div>
    );
  });
}


class Flashcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [ "Loading…", "HRAOGD/SKWR-RBGS" ]
    }
  }

  componentDidMount() {
    let path = process.env.PUBLIC_URL + '/lessons/collections/human-resources/hris-vocabulary/lesson.txt';
    getLesson(path).then((lessonText) => {
      let lesson = parseLesson(lessonText, path);
      let randomisedLessonMaterial = randomise(lesson.presentedMaterial);
      let flashcards = [];

      randomisedLessonMaterial.forEach(function (obj) {
        flashcards.push(obj.phrase);
        flashcards.push(obj.stroke);
      });

      this.setState({flashcards: flashcards});
    });
  }

  next() {
    this.reactSwipe.next();
  }

  prev() {
    this.reactSwipe.prev();
  }

  render () {
    let fullscreen = "";
    if (this.props.fullscreen) {
      fullscreen = " fullscreen";
    } else {
      fullscreen = "";
    }
    return (
      <div>
        <main id="main">
          <div className={"subheader hide-in-fullscreen" + fullscreen}>
            <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1">
                <header className="flex items-baseline">
                  <h2 id="about-typey-type-for-stenographers">Flashcards</h2>
                </header>
              </div>
            </div>
          </div>
          <div className="p3 mx-auto mw-1024">
            <div>

              <div className="visually-hidden">
                {paneNodes(this.state.flashcards)}
              </div>

              <div className={"swipe-wrapper flex justify-between relative" + fullscreen} aria-hidden="true">

                <div className={"flex items-center hide-in-fullscreen" + fullscreen}><button className="link-button" type="button" onClick={this.prev.bind(this)} aria-label="Previous card"><span className="pagination-nav-button--prev">▸</span></button></div>

                <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className={"swipe" + fullscreen} key={this.state.flashcards.length + this.props.fullscreen}>
                  {paneNodes(this.state.flashcards)}
                </ReactSwipe>

                <div className={"checkbox-group text-center fullscreen-button fullscreen-button-ghost" + fullscreen}>
                  <label className="absolute absolute--fill" aria-label="Fullscreen"><input type="checkbox" name="fullscreen" id="fullscreen" checked={this.props.fullscreen} onChange={this.props.changeFullscreen} /></label>
                </div>

                <div className={"flex items-center hide-in-fullscreen" + fullscreen}><button className="link-button" type="button" onClick={this.next.bind(this)} aria-label="Next card">▸</button></div>

              </div>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Flashcards;
