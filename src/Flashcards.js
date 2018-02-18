import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import { IconFullscreen } from './Icon';
import { randomise } from './utils';
import {
  getLesson,
  parseLesson
} from './typey-type';
import {
  Link
} from 'react-router-dom';

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
      flashcards: [ "Loading flashcards…" ],
      sourceMaterial: [
        {phrase: 'Loading flashcards…', stroke: 'HRAOGD/SKWR-RBGS TPHRARB/TK-LS/KARDZ'},
      ],
      presentedMaterial: [
        {phrase: 'Loading flashcards…', stroke: 'HRAOGD/SKWR-RBGS TPHRARB/TK-LS/KARDZ'},
      ],
      title: 'Steno',
      subtitle: ''
    }
  }

  setupFlashCards(event) {
    if (event) { event.preventDefault() };
    let randomisedLessonMaterial = randomise(this.state.sourceMaterial.slice(0)).slice(0,29);
    let flashcards = [];

    randomisedLessonMaterial.forEach(function (obj) {
      flashcards.push(obj.phrase);
      flashcards.push(obj.stroke);
    });

    flashcards.push("Finished!");
    this.reactSwipe.slide(0, 500);

    this.setState({
      flashcards: flashcards,
      presentedMaterial: randomisedLessonMaterial
    });
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }

    let path = process.env.PUBLIC_URL + '/lessons/drills/top-10000-english-words/lesson.txt';
    if (this.props.lessonpath) {
      path = this.props.lessonpath;
    }

    getLesson(path).then((lessonText) => {
      let lesson = parseLesson(lessonText, path);
      this.setState({
        presentedMaterial: lesson.presentedMaterial,
        sourceMaterial: lesson.sourceMaterial,
        title: lesson.title,
        subtitle: lesson.subtitle
      }, () => {
        this.setupFlashCards();
      });
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
    let flashcardsHeading = 'Flashcards';
    let flashcardsSubtitle = '';
    if (this.state.subtitle) {
      flashcardsSubtitle = ' ' + this.state.subtitle;
    }
    if (this.state.title) {
      flashcardsHeading = this.state.title + flashcardsSubtitle + ' flashcards';
    }
    return (
      <div>
        <main id="main">
          <div className={"subheader hide-in-fullscreen" + fullscreen}>
            <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1">
                <header className="flex items-baseline">
                  <a href="./flashcards" onClick={this.setupFlashCards.bind(this)} className="heading-link table-cell mr2" role="button">
                    <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="flashcards">{flashcardsHeading}</h2>
                  </a>
                </header>
              </div>

              <div className="mxn2">
                {/* Shuffle button */}
                <a href="./flashcards" onClick={this.setupFlashCards.bind(this)} className="link-button link-button-ghost table-cell" role="button">Shuffle</a>
              </div>
            </div>
          </div>
          <div className="p3 mx-auto mw-1024">
            <div>


              {/* Screenreader flashcard list */}
              <div className="visually-hidden">
                {paneNodes(this.state.flashcards)}
              </div>

              <div className={"swipe-wrapper flex justify-between relative" + fullscreen} aria-hidden="true">

                {/* Page left, previous flashcard */}
                <div className={"pagination-nav-button flex items-center hide-in-fullscreen" + fullscreen}><button className="link-button" type="button" onClick={this.prev.bind(this)} aria-label="Previous card"><span className="pagination-nav-button--prev">▸</span></button></div>

                {/* Swipe-able flashcards */}
                <ReactSwipe
                    ref={reactSwipe => this.reactSwipe = reactSwipe}
                    className={"swipe" + fullscreen}
                    key={this.state.flashcards.length + this.props.fullscreen}
                    swipeOptions={{continuous: false}}
                  >
                  {paneNodes(this.state.flashcards)}
                </ReactSwipe>

                {/* Fullscreen button */}
                <div className={"checkbox-group text-center fullscreen-button fullscreen-button-ghost" + fullscreen}>
                  <label className="absolute absolute--fill" aria-label="Fullscreen">
                    <input className="absolute" type="checkbox" name="fullscreen" id="fullscreen" checked={this.props.fullscreen} onChange={this.props.changeFullscreen.bind(this)} />
                    <IconFullscreen iconWidth="24" iconHeight="24" className="icon-button" title="custom title for this context" />
                  </label>
                </div>

                {/* Page right, next flashcard */}
                <div className={"pagination-nav-button flex items-center hide-in-fullscreen" + fullscreen}><button className="link-button" type="button" onClick={this.next.bind(this)} aria-label="Next card">▸</button></div>

              </div>
              <p className="text-center"><Link to="./" className="text-small mt0">{this.state.title} lesson</Link></p>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Flashcards;
