import React, { Component } from 'react';
import { IconFullscreen } from './Icon';
import GoogleAnalytics from 'react-ga';
import FlashcardsCarouselActionButtons from './FlashcardsCarouselActionButtons';
import { IconExternal } from './Icon';
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import * as Utils from './utils';
import {
  getLesson,
  parseLesson
} from './typey-type';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from 'react-router-dom';

const shortestDimension = 3;
const longestDimension = 4;

let slideNodes = (flashcards) => {
  let slides = [];

  flashcards.forEach((item, i) => {
    slides.push(
      <React.Fragment key={i}>
        <Slide index={i + "-phrase"} key={i + "-phrase"} innerClassName={"carousel__slider__slide__slideInner"}>
          <div className="carousel__slider__slide flex items-center justify-center">
            <div className="flex items-center justify-center p3 wrap">
              {item.phrase}
            </div>
          </div>
        </Slide>
        <Slide index={i + "-stroke"} key={i + "-stroke"} innerClassName={"carousel__slider__slide__slideInner"}>
          <div className="carousel__slider__slide flex items-center justify-center">
            <div className="flex items-center justify-center p3 wrap">
              {item.stroke}
            </div>
          </div>
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
      naturalSlideWidth: shortestDimension,
      naturalSlideHeight: longestDimension,
      currentSlide: 0,
      currentSlideContent: "",
      currentSlideContentType: "phrase", // "phrase" || "stroke" || "finished"
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
      if (this.state.naturalSlideWidth === shortestDimension) {
        this.setState({
          naturalSlideWidth: longestDimension,
          naturalSlideHeight: shortestDimension,
currentSlide: currentSlide
        });
      }
    } else if (window.matchMedia("(orientation: portrait)").matches) {
      let currentSlide = 0;
      if (this.flashcardsCarousel) {
        currentSlide = this.flashcardsCarousel.state.currentSlide;
      }
      if (this.state.naturalSlideWidth === longestDimension) {
        this.setState({
          naturalSlideWidth: shortestDimension,
          naturalSlideHeight: longestDimension,
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
      if (Utils.isLessonTextValid(lessonText)) {
        let lesson = parseLesson(lessonText, path);
        this.setState({
          presentedMaterial: lesson.presentedMaterial,
          sourceMaterial: lesson.sourceMaterial,
          title: lesson.title,
          subtitle: lesson.subtitle
        }, () => {
          this.setupFlashCards();
        });
      } else {
        this.setState({title: "Flashcards not found"}, () => {
          this.setupFlashCards();
        });
      }
    }).catch((e) => {
      console.log('Unable to load lesson for flashcards', e)
    });
  };

  setupFlashCards(event) {
    let shuffle = false;
    let restart = false;
    let unfocus = false;
    if (event) {
      unfocus = event.target.dataset.unfocus;
      if (event.target.dataset.shuffle) { shuffle = true; }
      if (event.target.dataset.restart) { restart = true; }
      event.preventDefault()
    };

    let flashcards = [];
    let numberOfFlashcardsToShow = 100;
    let newlesson = false;

    let lessonpath = this.props.locationpathname;
    let flashcardsProgress = Object.assign({}, this.props.flashcardsProgress);
    if (!flashcardsProgress[lessonpath]) {
      // Give this new lesson a lastSeen timestamp
      flashcardsProgress = this.props.updateFlashcardsProgress(lessonpath);
      newlesson = true;
    }

    let timeAgoInMinutes = (Date.now() - flashcardsProgress[lessonpath].lastSeen) / 60000;
    const baseUnitInMinutes = 30;
    const multiplier = 2;
    let threshold = getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier);
    if (newlesson === true) { threshold = 1; }

    flashcards = chooseFlashcardsToShow(this.state.sourceMaterial.slice(0), this.props.flashcardsMetWords, numberOfFlashcardsToShow, threshold, shuffle);

    let currentSlide = 0;
    if (this.flashcardsCarousel) {
      // if there's an event, you clicked Shuffle or the heading or something to start again
      if (!event) {
        // if you've resized or rotated your device, keep the same flashcard
        currentSlide = this.flashcardsCarousel.state.currentSlide;
      }
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
      let currentSlide = 0;
      if (this.flashcardsCarousel) {
        currentSlide = this.flashcardsCarousel.state.currentSlide;
      }
      if (this.state.naturalSlideWidth === shortestDimension) {
        this.setState({
          naturalSlideWidth: longestDimension,
          naturalSlideHeight: shortestDimension,
currentSlide: currentSlide
        });
      }
    }

    if (restart) {
      GoogleAnalytics.event({
        category: 'Flashcards',
        action: 'Restart',
        label: 'True'
      });
    }

    if (shuffle) {
      GoogleAnalytics.event({
        category: 'Flashcards',
        action: 'Shuffle',
        label: 'True'
      });
    }

    this.setState({
      flashcards: flashcards,
      currentSlide: currentSlide
    }, () => {
      // A hack for returning focus to a sensible carousel action button
      // This is used in 2 places
      // https://stackoverflow.com/questions/1096436/document-getelementbyidid-focus-is-not-working-for-firefox-or-chrome
      // https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673
      window.setTimeout(function ()
      {
        if (unfocus) {
          if (this.hardButton) {
            let element = document.getElementById('hardButton');
            if (element) {
              element.focus();
            }
          }
          else if (this.showButton) {
            let element = document.getElementById('showButton');
            if (element) {
              element.focus();
            }
          }
          else if (this.shuffleButton) {
            let element = document.getElementById('shuffleButton');
            if (element) {
              element.focus();
            }
          }
        }
      }, 0);
    });
  }

  // this happens automagically whenever a slide changes, including on Easy/Hard,
  // but doesn't have user feedback to say if it was a known flashcard or not
  onChangeCurrentSlide(slideIndex) {
    let lessonpath = this.props.locationpathname;
    this.props.updateFlashcardsProgress(lessonpath);

    let [currentSlideContent, currentSlideContentType] = getCurrentSlideContentAndType(this.state.flashcards, slideIndex);
    if (currentSlideContentType === "stroke") {
      let word = getWordForCurrentStrokeSlideIndex(this.state.flashcards, slideIndex);
      this.props.updateFlashcardsMetWords(word, "show", currentSlideContent, this.state.flashcardsMetWords);
    }
    else if (currentSlideContentType === "phrase") {
      let stroke = getStrokeForCurrentSlideContent(currentSlideContent, this.state.sourceMaterial);
      this.props.updateFlashcardsMetWords(currentSlideContent, "show", stroke, this.state.flashcardsMetWords);
    }

    let labelString = currentSlideContent;
    if (!labelString) { labelString = "BAD_INPUT"; } else { labelString = labelString.toString(); }

    GoogleAnalytics.event({
      category: 'Flashcards',
      action: 'Change slide',
      label: labelString
    });

      // this.nextSlide();
    this.setState({
      currentSlide: slideIndex,
      currentSlideContent: currentSlideContent,
      currentSlideContentType: currentSlideContentType,
    }, () => {
    // console.log(getCurrentSlideContentAndType(this.state.flashcards, slideIndex));
    });
  }

  // this happens specifically when you click Easy/Hard and that feedback needs to be recorded
  nextSlide(event) {
    let feedback = "show";
    let unfocus = false;
    if (event) {
      feedback = event.target.dataset.flashcardFeedback;
      unfocus = event.target.dataset.unfocus;
    }
    let slideIndex = 0;
    if (this.flashcardsCarousel) { slideIndex = this.flashcardsCarousel.state.currentSlide; }
    let [currentSlideContent, currentSlideContentType] = getCurrentSlideContentAndType(this.state.flashcards, slideIndex);
    if (currentSlideContentType === "stroke") {
      let word = getWordForCurrentStrokeSlideIndex(this.state.flashcards, this.state.currentSlide);
      this.props.updateFlashcardsMetWords(word, feedback, currentSlideContent, this.state.flashcardsMetWords);
    }
    else if (currentSlideContentType === "phrase") {
      let stroke = getStrokeForCurrentSlideContent(currentSlideContent, this.state.sourceMaterial);
      this.props.updateFlashcardsMetWords(currentSlideContent, "show", stroke, this.state.flashcardsMetWords);
    }

    let actionString = feedback;
    let labelString = currentSlideContent;

    if (!actionString) { actionString = "BAD_INPUT"; } else { actionString = actionString.toString(); }
    if (!labelString) { labelString = "BAD_INPUT"; } else { labelString = labelString.toString(); }

    GoogleAnalytics.event({
      category: 'Flashcards',
      action: actionString,
      label: labelString
    });

    this.setState({
      currentSlideContent: currentSlideContent,
      currentSlideContentType: currentSlideContentType
    }, () => {
      // A hack for returning focus to a sensible carousel action button
      // This is used in 2 places
      // https://stackoverflow.com/questions/1096436/document-getelementbyidid-focus-is-not-working-for-firefox-or-chrome
      // https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673
      window.setTimeout(function ()
      {
        if (unfocus) {
          if (this.hardButton) {
            let element = document.getElementById('hardButton');
            if (element) {
              element.focus();
            }
          }
          else if (this.showButton) {
            let element = document.getElementById('showButton');
            if (element) {
              element.focus();
            }
          }
          else if (this.shuffleButton) {
            let element = document.getElementById('shuffleButton');
            if (element) {
              element.focus();
            }
          }
        }
      }, 0);
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

    let lessonpath = this.props.locationpathname.replace('flashcards','');
    if (this.state.title.includes("Top 10000 English words")) {
      lessonpath = "/lessons/drills/top-10000-english-words/";
    }

    return (
      <div>
        <main id="main">
          <div className={"subheader hide-in-fullscreen" + fullscreen}>
            <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1 self-center">
                <header className="flex items-baseline">
                  <a href="./flashcards" onClick={this.setupFlashCards.bind(this)} className="heading-link table-cell mr2" role="button">
                    <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="flashcards">{flashcardsHeading}</h2>
                  </a>
                </header>
              </div>
              <div className="flex mxn2">
                {/* Shuffle button */}
                <a href="./flashcards" onClick={this.setupFlashCards.bind(this)} className="link-button link-button-ghost table-cell" data-shuffle="true" role="button">Shuffle</a>
              </div>
            </div>
          </div>

          <div className="p3 mx-auto mw-1024">
            <div className="flex flex-wrap justify-between">
              <p className={"text-small hide-in-fullscreen" + fullscreen}>Back to <Link to={lessonpath} className={"hide-in-fullscreen" + fullscreen}>{this.state.title} lesson</Link>.</p>
              <p className={"text-small hide-in-fullscreen" + fullscreen}>Learn more <Link to="/support#flashcards" className="mt0">about flashcards</Link>.</p>
            </div>
            <div>

              {/* Screenreader flashcard heading for context */}
              <div className="visually-hidden"><h3>Carousel of lesson words and their strokes</h3></div>

              <div className={ this.props.fullscreen ? "" : "ml4 mr4"}>
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

                  <FlashcardsCarouselActionButtons
                    ButtonNext={ButtonNext}
                    currentSlideContent={this.state.currentSlideContent}
                    currentSlideContentType={this.state.currentSlideContentType}
                    nextSlide={this.nextSlide.bind(this)}
                    numberOfFlashcards={this.state.flashcards.length}
                    setupFlashCards={this.setupFlashCards.bind(this)}
                  />

                  {/* Fullscreen button */}
                  <div className={"checkbox-group text-center fullscreen-button fullscreen-button-ghost" + fullscreen}>
                    <label className="absolute absolute--fill" aria-label="Fullscreen">
                      <input className="absolute" type="checkbox" name="fullscreen" id="fullscreen" checked={this.props.fullscreen} onChange={this.props.changeFullscreen.bind(this)} />
                      <IconFullscreen iconWidth="24" iconHeight="24" className="icon-button" title="custom title for this context" />
                    </label>
                  </div>
                </CarouselProvider>
              </div>



              <p className={"text-small text-center mt1 pt6 hide-in-fullscreen" + fullscreen}><a href={this.prefillSurveyLink()} className="mt0" target="_blank" rel="noopener noreferrer" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--flashcards--give-feedback">Give feedback on this flashcard (form opens in a new tab)</a>.</p>
              <p className={"text-small text-center mb0 hide-in-fullscreen" + fullscreen}>
                <GoogleAnalytics.OutboundLink
                  eventLabel="Look up brief on StenoKnight’s Plover lookup"
                  aria-label="Look up brief on StenoKnight’s Plover lookup (opens in new tab)"
                  to="http://stenoknight.com/plover/ploverlookup/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Look up brief on StenoKnight’s Plover lookup
                  <Tooltip
                    title="(opens in new tab)"
                    animation="shift"
                    arrow="true"
                    className=""
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                  </Tooltip>
                </GoogleAnalytics.OutboundLink>.
              </p>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

// console.log("Considering: '"+flashcardsMetWords[item.phrase].phrase + "' against threshold: "+threshold+" where rung is: "+flashcardsMetWords[item.phrase].rung);
// console.log("Pushing: '"+flashcardsMetWords[item.phrase].phrase+"'");
function chooseFlashcardsToShow(sourceMaterial, flashcardsMetWords, numberOfFlashcardsToShow, threshold, randomise = false) {
  let presentedMaterial = sourceMaterial.slice(0, 100); // estimated comfortable rendering/animation limit
  let flashcardItemsToShow = [];

  if (randomise) { presentedMaterial = Utils.randomise(presentedMaterial); }

  presentedMaterial.forEach((item, i) => {
    if (flashcardsMetWords[item.phrase]) {
      if (flashcardsMetWords[item.phrase].rung <= threshold) {
        flashcardItemsToShow.push(item);
      }
    } else {
      // If you've never seen this word in flashcards before, add it and set its rung to 0
      flashcardsMetWords[item.phrase] = {
        phrase: item.phrase,
        stroke: item.stroke,
        rung: 0
      }
      // If you've never seen it, show the flashcard
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
  // console.log("Threshold: "+rungThreshold+ " because baseUnitInMinutes was: "+ baseUnitInMinutes+" and multiplier was: "+multiplier+" and i: "+i+" and of course timeAgoInMinutes was: "+timeAgoInMinutes);
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
