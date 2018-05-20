import React, { Component } from 'react';
import { IconFullscreen } from './Icon';
import { randomise } from './utils';
import {
  getLesson,
  parseLesson
} from './typey-type';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  Link
} from 'react-router-dom';

let slideNodes = function (flashcards) {
  return flashcards.map((item, i) => {
    return (
      <Slide index={i} key={i} innerClassName={"carousel__slider__slide__slideInner"}>
        <div className="carousel__slider__slide flex items-center justify-center">{item}</div>
      </Slide>
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
      naturalSlideWidth: 9,
      naturalSlideHeight: 16,
      currentSlide: 0,
      title: 'Steno',
      subtitle: ''
    }
  }

  setupFlashCards(event) {
    if (event) { event.preventDefault() };
    let randomisedLessonMaterial = randomise(this.state.sourceMaterial.slice(0)).slice(0,29);
    let flashcards = [];
    let currentSlide = 0;

    randomisedLessonMaterial.forEach(function (obj) {
      flashcards.push(obj.phrase);
      flashcards.push(obj.stroke);
    });

    flashcards.push("Finished!");

    if (this.flashcardsCarousel) {
      currentSlide = this.flashcardsCarousel.state.currentSlide;
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
      let currentSlide = 0;
      if (this.flashcardsCarousel) {
        currentSlide = this.flashcardsCarousel.state.currentSlide;
      }
      if (this.state.naturalSlideWidth === 9) {
        this.setState({
          naturalSlideWidth: 16,
          naturalSlideHeight: 9,
          currentSlide: currentSlide
        });
      }
    }

    this.setState({
      flashcards: flashcards,
      presentedMaterial: randomisedLessonMaterial,
      currentSlide: currentSlide
    });
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
    window.addEventListener('resize', this.handleResize);
    this.fetchAndSetupFlashCards();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.lessonpath !== this.props.lessonpath) && (this.props.locationpathname.endsWith('flashcards'))) {
      this.fetchAndSetupFlashCards();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = (event) => {
    if (window.matchMedia("(orientation: landscape)").matches) {
      let currentSlide = 0;
      if (this.flashcardsCarousel) {
        currentSlide = this.flashcardsCarousel.state.currentSlide;
      }
      if (this.state.naturalSlideWidth === 9) {
        this.setState({
          naturalSlideWidth: 16,
          naturalSlideHeight: 9,
          currentSlide: currentSlide
        });
      }
    } else if (window.matchMedia("(orientation: portrait)").matches) {
      let currentSlide = 0;
      if (this.flashcardsCarousel) {
        currentSlide = this.flashcardsCarousel.state.currentSlide;
      }
      if (this.state.naturalSlideWidth === 16) {
        this.setState({
          naturalSlideWidth: 9,
          naturalSlideHeight: 16,
          currentSlide: currentSlide
        });
      }
    }
  }

  fetchAndSetupFlashCards() {
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
  };

  prefillSurveyLink() {
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSc3XqvJC2lwIRieR5NVoAI7nYa4fTFSZL4Ifk1YA7K7I-lnog/viewform?usp=pp_url&entry.1884511690=";
    let param = "&entry.1893816394=";
    let prefillLesson = '';
    let prefillFlashcard = '';
    if (this.props.locationpathname) {
      prefillLesson = this.props.locationpathname;
    }
    if (this.state.flashcards && this.flashcardsCarousel) {
      prefillFlashcard = this.state.flashcards[this.flashcardsCarousel.state.currentSlide];
    }
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillLesson) + param + encodeURIComponent(prefillFlashcard);
    }
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

              {/* Screenreader flashcard heading for context */}
              <div className="visually-hidden"><h3>Carousel of lesson words and their strokes</h3></div>

              <CarouselProvider
                naturalSlideWidth={this.state.naturalSlideWidth}
                naturalSlideHeight={this.state.naturalSlideHeight}
                totalSlides={this.state.flashcards.length}
                currentSlide={this.state.currentSlide}
                className={"carousel--flashcards relative" + fullscreen}
              >
                {/* Carousel Slider Slide flashcards */}
                <Slider
                  ref={flashcardsCarousel => this.flashcardsCarousel = flashcardsCarousel}
                  className={"carousel__slider" + fullscreen}
                  key={this.state.flashcards.length + this.props.fullscreen}
                >
                  {slideNodes(this.state.flashcards)}
                </Slider>

                {/* Page left, previous flashcard */}
                <div className={"pagination-nav-button pagination-nav-button--prev absolute hide-in-fullscreen" + fullscreen}>
                  <ButtonBack className="link-button" type="button" aria-label="Previous card"><span className="pagination-nav-button--prev__icon">◂</span></ButtonBack>
                </div>

                {/* Page right, next flashcard */}
                <div className={"pagination-nav-button pagination-nav-button--next absolute right-0 hide-in-fullscreen" + fullscreen}>
                  <ButtonNext className="link-button" type="button" aria-label="Next card">▸</ButtonNext>
                </div>

                {/* Fullscreen button */}
                <div className={"checkbox-group text-center fullscreen-button fullscreen-button-ghost" + fullscreen}>
                  <label className="absolute absolute--fill" aria-label="Fullscreen">
                    <input className="absolute" type="checkbox" name="fullscreen" id="fullscreen" checked={this.props.fullscreen} onChange={this.props.changeFullscreen.bind(this)} />
                    <IconFullscreen iconWidth="24" iconHeight="24" className="icon-button" title="custom title for this context" />
                  </label>
                </div>
              </CarouselProvider>



              <p className="text-center mt1 mb0"><Link to="./" className={"text-small hide-in-fullscreen" + fullscreen}>{this.state.title} lesson</Link></p>
              <p className="text-center"><a href={this.prefillSurveyLink()} className="text-small mt0" target="_blank" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--flashcards--give-feedback">Give feedback on this flashcard (form opens in a new tab)</a></p>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Flashcards;
