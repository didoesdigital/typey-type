import React, { Component } from 'react';
import { IconFullscreen } from './Icon';
// import { randomise } from './utils';
import {
  getLesson,
  parseLesson,
  writePersonalPreferences
} from './typey-type';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  Link
} from 'react-router-dom';

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
      if (path === 'flashcards') { path = process.env.PUBLIC_URL + '/lessons/drills/top-10000-english-words/lesson.txt'; }
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

  setupFlashCards(event) {
    if (event) { event.preventDefault() };

    let flashcards = [];
    let numberOfFlashcardsToShow = 100;
    let newlesson = false;

    let lessonpath = this.props.locationpathname;
    if (lessonpath && lessonpath !== '/flashcards/') { lessonpath.replace(/flashcards$/,''); }
    let flashcardsProgress = Object.assign({}, this.props.flashcardsProgress);
    if (!flashcardsProgress[lessonpath]) {
      flashcardsProgress = this.props.updateFlashcardsProgress(lessonpath);
      newlesson = true;
    }
    if (newlesson === true) { threshold = 1; }

    let timeAgoInMinutes = (Date.now() - flashcardsProgress[lessonpath].lastSeen) / 60000;
    const baseUnitInMinutes = 30;
    const multiplier = 2;
    let threshold = getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier);

    flashcards = chooseFlashcardsToShow(this.state.sourceMaterial.slice(0), this.props.flashcardsMetWords, numberOfFlashcardsToShow, threshold);
    // flashcards = randomise(flashcards);

    let currentSlide = 0;
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
      currentSlide: currentSlide
    });
  }

  // this happens automagically whenever a slide changes, but doesn't have user
  // feedback to say if it was a known flashcard or not
  onChangeCurrentSlide(slideIndex) {
    let lessonpath = this.props.locationpathname.replace(/flashcards$/,'');
    let newFlashcardsProgress = this.props.updateFlashcardsProgress(lessonpath);

    let [currentSlideContent, currentSlideContentType] = getCurrentSlideContentAndType(this.state.flashcards, slideIndex);
    if (currentSlideContentType === "stroke") {
      let word = getWordForCurrentStrokeSlideIndex(this.state.flashcards, slideIndex);
      let newFlashcardsMetWords = this.props.updateFlashcardsMetWords(word, "skip", currentSlideContent, this.state.flashcardsMetWords);
    }
    else if (currentSlideContentType === "phrase") {
      let stroke = getStrokeForCurrentSlideContent(currentSlideContent, this.state.sourceMaterial);
      let newFlashcardsMetWords = this.props.updateFlashcardsMetWords(currentSlideContent, "skip", stroke, this.state.flashcardsMetWords);
    }

      // this.nextSlide();
    this.setState({
      currentSlide: slideIndex
    }, () => {
    // console.log(getCurrentSlideContentAndType(this.state.flashcards, slideIndex));
    });
  }

  // this happens specifically when you click Easy/Hard and that feedback needs to be recorded
  nextSlide(event) {
    let feedback = "skip";
    if (event) {
      feedback = event.target.dataset.flashcardFeedback;
    }
    let slideIndex = 0;
    if (this.flashcardsCarousel) { slideIndex = this.flashcardsCarousel.state.currentSlide; }
    let [currentSlideContent, currentSlideContentType] = getCurrentSlideContentAndType(this.state.flashcards, slideIndex);
    if (currentSlideContentType === "stroke") {
      let word = getWordForCurrentStrokeSlideIndex(this.state.flashcards, this.state.currentSlide);
      let newFlashcardsMetWords = this.props.updateFlashcardsMetWords(word, feedback, currentSlideContent, this.state.flashcardsMetWords);
    }
    else if (currentSlideContentType === "phrase") {
      let stroke = getStrokeForCurrentSlideContent(currentSlideContent, this.state.sourceMaterial);
      let newFlashcardsMetWords = this.props.updateFlashcardsMetWords(currentSlideContent, "skip", stroke, this.state.flashcardsMetWords);
    }
    // debugger
    this.setState({
      currentSlideContent: currentSlideContent,
    });
  }

  prefillSurveyLink() {
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSc3XqvJC2lwIRieR5NVoAI7nYa4fTFSZL4Ifk1YA7K7I-lnog/viewform?usp=pp_url&entry.1884511690=";
    let param = "&entry.1893816394=";
    let prefillLesson = '';
    let prefillFlashcard = '';
    if (this.props.locationpathname) {
      prefillLesson = this.props.locationpathname;
    }
    let currentSlideNumber = 0;
    if (this.flashcardsCarousel) {
      currentSlideNumber = this.flashcardsCarousel.state.currentSlide;
    }
    prefillFlashcard = getCurrentSlideContentAndType(this.state.flashcards, currentSlideNumber)[0];
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
              {/*<div className="mxn2"> */}
                {/* Shuffle button */}
                {/*<a href="./flashcards" onClick={this.setupFlashCards.bind(this)} className="link-button link-button-ghost table-cell" role="button">Shuffle</a> */}
                {/*</div> */}
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
                  callback={this.onChangeCurrentSlide.bind(this)}
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
                  <ButtonNext className="link-button" disabled={this.state.currentSlide % 2 === 0} type="button" onClick={this.nextSlide.bind(this)} data-flashcard-feedback="easy" value={this.state.currentSlideContent} aria-label="Next card">Easy</ButtonNext>
                  <ButtonNext className="link-button" disabled={this.state.currentSlide % 2 === 0} type="button" onClick={this.nextSlide.bind(this)} data-flashcard-feedback="hard" value={this.state.currentSlideContent} aria-label="Next card">Hard</ButtonNext>
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

      // console.log("Considering: '"+flashcardsMetWords[item.phrase].phrase + "' against threshold: "+threshold+" where rung is: "+flashcardsMetWords[item.phrase].rung);
        // console.log("Pushing: '"+flashcardsMetWords[item.phrase].phrase+"'");
function chooseFlashcardsToShow(sourceMaterial, flashcardsMetWords, numberOfFlashcardsToShow, threshold) {
  let presentedMaterial = sourceMaterial.slice(0, 100); // estimated comfortable rendering/animation limit
  let flashcardItemsToShow = [];

  presentedMaterial.forEach((item, i) => {
    if (flashcardsMetWords[item.phrase]) {
      if (flashcardsMetWords[item.phrase].rung <= threshold) {
        flashcardItemsToShow.push(item);
      }
    } else {
      flashcardsMetWords[item.phrase] = {
        phrase: item.phrase,
        stroke: item.stroke,
        rung: 0
      }
      flashcardItemsToShow.push(item);
      // flashcardsMetWords = this.props.updateFlashcardsMetWords(item.phrase, "skip", item.stroke, 0);
    }
  });
  if (threshold < 2) { numberOfFlashcardsToShow = 15; }
  flashcardItemsToShow = flashcardItemsToShow.slice(0, numberOfFlashcardsToShow);
  return flashcardItemsToShow;
}

// timeAgoInMinutes = 40
function getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier) {
  let rungThreshold = 0;
  let i = baseUnitInMinutes * Math.pow(multiplier, (rungThreshold)); // i = 30
  while (i < timeAgoInMinutes) { // 30 < 40 === true; 60 < 40 === false;
    rungThreshold = rungThreshold + 1; // rungThreshold = 1
    i = baseUnitInMinutes * Math.pow(multiplier, (rungThreshold)); // i = 60
  }
  console.log("Threshold: "+rungThreshold+ " because baseUnitInMinutes was: "+ baseUnitInMinutes+" and multiplier was: "+multiplier+" and i: "+i+" and of course timeAgoInMinutes was: "+timeAgoInMinutes);
  return rungThreshold;
}

function getCurrentSlideContentAndType(flashcards, flashcardsCarouselCurrentSlide) {
  let currentSlideContent = ["", ""];
  let currentSlide = flashcardsCarouselCurrentSlide;
  let flashcardsIndex = 0;
  // assumes stroke slides are always odd
  if (currentSlide > (flashcards.length * 2)) {
    currentSlideContent = ["Finished…", "finished"]; // this case would be a bug
  } else if (currentSlide % 2 === 1) {
    flashcardsIndex = (currentSlide - 1) / 2;
    currentSlideContent[0] = flashcards[flashcardsIndex].stroke;
    currentSlideContent[1] = "stroke";
  // assumes word and Finished! slides are always even
  } else if (currentSlide % 2 === 0) {
    flashcardsIndex = currentSlide / 2;
    if (flashcardsIndex === flashcards.length) {
      currentSlideContent[0] = "Finished!";
      currentSlideContent[1] = "finished";
    } else {
      currentSlideContent[0] = flashcards[flashcardsIndex].phrase;
      currentSlideContent[1] = "phrase";
    }
  }
  return currentSlideContent;
}

function getWordForCurrentStrokeSlideIndex(flashcards, slideIndex) {
  let word = "";
  let flashcardsIndex = 0;
  // assumes stroke slides are always odd
  if (slideIndex > (flashcards.length * 2)) {
    word = "";
  } else if (slideIndex % 2 === 1) {
    flashcardsIndex = (slideIndex - 1) / 2;
    word = flashcards[flashcardsIndex].phrase;
  }
  return word;
}

function getStrokeForCurrentSlideContent(word, sourceMaterial) {
  let stroke = "XXX";
  let i = 0;
  let length = sourceMaterial.length;

  for (; i < length; i++) {
    if (sourceMaterial[i].phrase === word) {
      stroke = sourceMaterial[i].stroke;
    }
  }
  return stroke;
}

export default Flashcards;
export {
  chooseFlashcardsToShow,
  getCurrentSlideContentAndType,
  getFlashcardsRungThreshold,
  getStrokeForCurrentSlideContent,
  getWordForCurrentStrokeSlideIndex
};
