import React, { Component } from 'react';
import { IconFullscreen } from './Icon';
import { randomise } from './utils';
import {
  getLesson,
  parseLesson,
  writePersonalPreferences
} from './typey-type';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, WithStore } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  Link
} from 'react-router-dom';
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');





let slideNodes = (flashcards) => {
  let slides = [];

  flashcards.forEach((item, i) => {
    slides.push(
      <React.Fragment key={i}>
        <Slide index={i + "-phrase"} key={i + "-phrase"} innerClassName={"carousel__slider__slide__slideInner"}>
          <div className="carousel__slider__slide flex items-center justify-center">{item.phrase}</div>
        </Slide>
        <Slide index={i + "-stroke"} key={i + "-stroke"} innerClassName={"carousel__slider__slide__slideInner"}>
          <div className="carousel__slider__slide flex items-center justify-center">{item.stroke}</div>
        </Slide>
      </React.Fragment>
    );
  });

  slides.push(
    <Slide index={"finished"} key={"finished"} innerClassName={"carousel__slider__slide__slideInner"}>
      <div className="carousel__slider__slide flex items-center justify-center">Finished!</div>
    </Slide>
  )

  return slides;
}


// class YourComponentHereInner extends Component {
//   componentWillReceiveProps (nextProps) {
//     // debugger
//     const { currentSlide, onChangeCurrentSlide } = this.props;
//     if (nextProps.currentSlide !== currentSlide && onChangeCurrentSlide) {
//       onChangeCurrentSlide(nextProps.currentSlide)
//     }
//   }

  // render () {
  //   let fullscreen = false;
  //   let slideNodes = [];

  //   this.props.flashcards.forEach((item, i) => {
  //     slideNodes.push(
  //       <React.Fragment key={i}>
  //         <Slide index={i + "-phrase"} key={i + "-phrase"} innerClassName={"carousel__slider__slide__slideInner"}>
  //           <div className="carousel__slider__slide flex items-center justify-center">{item.phrase}</div>
  //         </Slide>
  //         <Slide index={i + "-stroke"} key={i + "-stroke"} innerClassName={"carousel__slider__slide__slideInner"}>
  //           <div className="carousel__slider__slide flex items-center justify-center">{item.stroke}</div>
  //         </Slide>
  //       </React.Fragment>
  //     );
  //   });

  //   slideNodes.push(
  //     <Slide index={"finished"} key={"finished"} innerClassName={"carousel__slider__slide__slideInner"}>
  //       <div className="carousel__slider__slide flex items-center justify-center">Finished!</div>
  //     </Slide>
  //   )
  //   return (
  //     <React.Fragment>
  //               {/* Carousel Slider Slide flashcards */}
  //               <Slider
  //                 ref={forwardedRef}
  //                 key={"test"}
  //               >
  //                 {slideNodes}
  //               </Slider>

  //               {/* Page left, previous flashcard */}
  //               <div className={"pagination-nav-button pagination-nav-button--prev absolute hide-in-fullscreen" + fullscreen}>
  //                 <ButtonBack className="link-button" type="button" aria-label="Previous card"><span className="pagination-nav-button--prev__icon">◂</span></ButtonBack>
  //               </div>

  //               {/* Page right, next flashcard */}
  //               <div className={"pagination-nav-button pagination-nav-button--next absolute right-0 hide-in-fullscreen" + fullscreen}>
  //                 <ButtonNext className="link-button" type="button" aria-label="Next card">▸</ButtonNext>
  //               </div>

  //               <div className="text-right mr2">
  //                 <ButtonNext className="link-button" type="button" onClick={this.props.nextSlide.bind(this)} data-flashcard-feedback="easy" value={this.props.currentSlideContent} aria-label="Next card">Easy</ButtonNext>
  //                 <ButtonNext className="link-button" type="button" onClick={this.props.nextSlide.bind(this)} data-flashcard-feedback="hard" value={this.props.currentSlideContent} aria-label="Next card">Hard</ButtonNext>
  //               </div>

  //               {/* Fullscreen button */}
  //               <div className={"checkbox-group text-center fullscreen-button fullscreen-button-ghost" + fullscreen}>
  //                 <label className="absolute absolute--fill" aria-label="Fullscreen">
  //                   <input className="absolute" type="checkbox" name="fullscreen" id="fullscreen" checked={this.props.fullscreen} onChange={this.props.changeFullscreen.bind(this)} />
  //                   <IconFullscreen iconWidth="24" iconHeight="24" className="icon-button" title="custom title for this context" />
  //                 </label>
  //               </div>
  //             </React.Fragment>
  // );
  // }
// }

// const YourComponentHere = WithStore(YourComponentHereInner, state => ({
  //   // these are read only properties.  we use the "deepFreeze"
  //   // npm package to make these properties immutable. You don't have to use
  //   // all of these, just pick the ones you need.
  //   currentSlide: state.currentSlide,
  //   disableAnimation: state.disableAnimation,
  //   hasMasterSpinner: state.hasMasterSpinner,
  //   imageErrorCount: state.imageErrorCount,
  //   imageSuccessCount: state.imageSuccessCount,
  //   lockOnWindowScroll: state.lockOnWindowScroll,
  //   masterSpinnerThreshold: state.masterSpinnerThreshold,
  //   naturalSlideHeight: state.naturalSlideHeight,
  //   naturalSlideWidth: state.naturalSlideWidth,
  //   orientation: state.orientation,
  //   slideSize: state.slideSize,
  //   slideTraySize: state.slideTraySize,
  //   step: state.step,
  //   totalSlides: state.totalSlides,
  //   touchEnabled: state.touchEnabled,
  //   dragEnabled: state.dragEnabled,
  //   visibleSlides: state.visibleSlides,
  // }));

class Flashcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideNodes: [],
      flashcards: [
        {
          phrase: 'Loading flashcards…',
          stroke: 'HRAOGD/SKWR-RBGS TPHRARB/TK-LS/KARDZ'
        },
      ],
      sourceMaterial: [
        {
          phrase: 'Loading flashcards…',
          stroke: 'HRAOGD/SKWR-RBGS TPHRARB/TK-LS/KARDZ'
        },
      ],
      presentedMaterial: [
        {
          phrase: 'Loading flashcards…',
          stroke: 'HRAOGD/SKWR-RBGS TPHRARB/TK-LS/KARDZ'
        },
      ],
      naturalSlideWidth: 9,
      naturalSlideHeight: 16,
      currentSlide: 0,
      currentSlideContent: "",
      title: 'Steno',
      subtitle: '',
    }
  }

  chooseFlashcardsToShow(sourceMaterial, flashcardsMetWords, numberOfFlashcardsToShow = 30) {
    let presentedMaterial = [
      {
        phrase: 'Loading flashcards…',
        stroke: 'HRAOGD/SKWR-RBGS TPHRARB/TK-LS/KARDZ'
      },
    ];
    // let exampleFlashcardsMetWords = {
    //   "The": {
    //     phrase: 'The',
    //     stroke: '-T',
    //     times_seen: [1526815977]
    //   }
    // };
    // flashcardsMetWords = this.props.flashcardsMetWords;
      // {
      // "wolf": {
      //   phrase: 'wolf',
      //   stroke: 'WOFL',
      //   times_seen: [1526815977, 1526815977, 1526815977, 1526815977]
      // }
    // };

    // TODO: change this to actually check the sourceMaterial provided is valid
    if (sourceMaterial) {
      presentedMaterial = sourceMaterial.slice(0, numberOfFlashcardsToShow - 1);
    }

    let tmp = [];

    // TODO: change this to actually check the flashcardsMetWords provided is valid
    // debugger
    if (flashcardsMetWords) {
      presentedMaterial.forEach((item, i) => {
        tmp.push(item);
        if (flashcardsMetWords[item.phrase]) {
          // add word to lesson inversely according to times you've seen it
          // TODO: deal with large numbers of times seen
          let repeat = 12 - flashcardsMetWords[item.phrase].times_seen.length;
          for (let i = 0; i < repeat; i++) tmp.push(item);
        }
      });
      // console.log(tmp);
    }

    return tmp;
  }

  setupFlashCards(event) {
    if (event) { event.preventDefault() };

    let currentSlide = 0;

    let flashcards = [];
    flashcards = this.chooseFlashcardsToShow(this.state.sourceMaterial.slice(0), this.props.flashcardsMetWords, 30);
    flashcards = randomise(flashcards);

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

    // debugger
    this.setState({
      flashcards: flashcards,
      currentSlide: currentSlide
    });
  }

  componentDidMount() {
if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
    window.addEventListener('resize', this.handleResize);
    this.fetchAndSetupFlashCards();
  }
componentWillReceiveProps (nextProps) {
  const changedProps = _.reduce(this.props, function (result, value, key) {
    return _.isEqual(value, nextProps[key])
      ? result
      : result.concat(key)
  }, [])
  console.log('changedProps: ', changedProps)
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
    prefillFlashcard = this.getCurrentSlideContent();
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillLesson) + param + encodeURIComponent(prefillFlashcard);
    }
  }

  getStrokeForCurrentSlideContent(word) {
    let stroke = "XXX";

    for (let i = 0; i < this.state.sourceMaterial.length; i++) {
      if (this.state.sourceMaterial[i].phrase === word) {
        stroke = this.state.sourceMaterial[i].stroke;
      }
    }
    return stroke;
  }

  getCurrentSlideContent() {
    let currentSlideContent = '';
    // debugger
    if (this.state.flashcards && this.flashcardsCarousel) {
      let currentSlide = this.flashcardsCarousel.state.currentSlide;
      let index = 0;
      if (currentSlide % 2 === 1) {
        index = (currentSlide - 1) / 2;
        currentSlideContent = this.state.flashcards[index].stroke;
      } else if (currentSlide % 2 === 0) {
        index = currentSlide / 2;
        if (index === this.state.flashcards.length) {
          currentSlideContent = "Finished!";
        } else {
          currentSlideContent = this.state.flashcards[index].phrase;
        }
      }
    }
    return currentSlideContent;
  }

  onChangeCurrentSlide(slideNumber) {
    this.setState({
      currentSlide: slideNumber
    });
  }

  nextSlide(event) {
    let feedback = "skip";
    if (event) {
      feedback = event.target.dataset.flashcardFeedback;
    }
    let currentSlideContent = this.getCurrentSlideContent();
    let stroke = this.getStrokeForCurrentSlideContent(currentSlideContent);
    // debugger
    let newFlashcardsMetWords = this.props.updateFlashcardsMetWords(currentSlideContent, feedback, stroke);
    // debugger
    writePersonalPreferences('flashcardsMetWords', newFlashcardsMetWords);
    console.log(currentSlideContent);
    this.setState({
      currentSlideContent: currentSlideContent
    });
  }

  render () {
    // console.log(this.props);
    // debugger
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

    const sliderRef = React.createRef();

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
                totalSlides={this.state.flashcards.length * 2 + 1}
                className={"carousel--flashcards relative" + fullscreen}
                currentSlide={this.state.currentSlide}
              >
                <Slider
                  className={"carousel__slider" + fullscreen}
                  flashcards={this.state.flashcards}
                  key={this.state.flashcards.length + this.props.fullscreen}
                  ref={flashcardsCarousel => this.flashcardsCarousel = flashcardsCarousel}
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

                <div className="text-right mr2">
                  <ButtonNext className="link-button" type="button" onClick={this.nextSlide.bind(this)} data-flashcard-feedback="easy" value={this.state.currentSlideContent} aria-label="Next card">Easy</ButtonNext>
                  <ButtonNext className="link-button" type="button" onClick={this.nextSlide.bind(this)} data-flashcard-feedback="hard" value={this.state.currentSlideContent} aria-label="Next card">Hard</ButtonNext>
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
