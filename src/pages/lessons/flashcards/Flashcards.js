import React, { Component } from 'react';
import GoogleAnalytics from "react-ga4";
import ReactModal from 'react-modal';
import { useAppMethods } from "../../../states/legacy/AppMethodsContext";
import { withAppMethods } from "../../../states/legacy/AppMethodsContext";
import { userSettingsState } from "../../../states/userSettingsState";
import { withAtomsCompat } from "../../../states/atomUtils";
import FlashcardsCarouselActionButtons from './components/FlashcardsCarouselActionButtons';
import FlashcardsModal from './components/FlashcardsModal';
import StrokesForWords from '../../../components/StrokesForWords';
import {
  chooseFlashcardsToShow,
  getCurrentSlideContentAndType,
  getFlashcardsRungThreshold,
  getStrokeForCurrentSlideContent,
  getWordForCurrentStrokeSlideIndex,
} from './utilities';
import * as Utils from '../../../utils/utils';
import { parseLesson } from '../../../utils/typey-type';
import { getLesson } from '../../../utils/getData';
import { CarouselProvider, Slider, ButtonBack, ButtonNext } from 'pure-react-carousel';
import SlideNodes from './components/SlideNodes';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from 'react-router-dom';
import Subheader from "../../../components/Subheader";
import { flashcardsMetWordsState } from "../../../states/flashcardsMetWordsState";
import {
  flashcardsProgressState,
  fullscreenState,
  useUpdateFlashcardsProgress
} from "../../../states/flashcardsProgressState";
import { useChangeFullscreen } from "../components/UserSettings/updateFlashcardSetting";

const shortestDimension = 3;
const longestDimension = 4;

class Flashcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
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

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('#js-app');
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
    let path = process.env.PUBLIC_URL + '/lessons/drills/top-1000-words/lesson.txt';
    if (this.props.lessonpath) {
      path = this.props.lessonpath;
      if (path === 'flashcards') { path = process.env.PUBLIC_URL + '/lessons/drills/top-1000-words/lesson.txt'; }
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
      this.props.setFlashcardsMetWords(word, "show", currentSlideContent);
    }
    else if (currentSlideContentType === "phrase") {
      let stroke = getStrokeForCurrentSlideContent(currentSlideContent, this.state.sourceMaterial);
      this.props.setFlashcardsMetWords(currentSlideContent, "show", stroke);
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
      this.props.setFlashcardsMetWords(word, feedback, currentSlideContent);
    }
    else if (currentSlideContentType === "phrase") {
      let stroke = getStrokeForCurrentSlideContent(currentSlideContent, this.state.sourceMaterial);
      this.props.setFlashcardsMetWords(currentSlideContent, "show", stroke);
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

  handleOpenModal (event) {
    event.preventDefault();
    this.setState({ showModal: true });
  }

  handleCloseModal (event) {
    event.preventDefault();
    this.setState({ showModal: false });
  }

  render () {
    const fullscreen = this.props.fullscreen ? " fullscreen" : "";
    const flashcardsSubtitle = this.state.subtitle ? ` ${this.state.subtitle}` : "";
    const flashcardsHeading = this.state.title ? `${this.state.title}${flashcardsSubtitle} flashcards` : 'Flashcards';
    const lessonpath = this.state.title.includes("Top 1000 words") ? '/lessons/drills/top-1000-words/' : this.props.locationpathname.replace('flashcards','');

    return (
      <div>
        <main id="main">
          <Subheader fullscreen={fullscreen}>
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <a href="./flashcards" onClick={this.setupFlashCards.bind(this)} className="heading-link table-cell mr2" role="button">
                  <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="flashcards">{flashcardsHeading}</h2>
                </a>
              </header>
            </div>
            <div className="flex mxn2">
              <Link to={lessonpath} className="link-button link-button-ghost table-cell mr1">Back to lesson</Link>
              {/* Shuffle button */}
              <a href="./flashcards" onClick={this.setupFlashCards.bind(this)} className="button button--secondary table-cell mr2" style={{lineHeight: 2}} data-shuffle="true" role="button">Shuffle</a>
            </div>
          </Subheader>

          <div className="p3 mx-auto mw-1024">
            <div className="flex flex-wrap justify-between">
              <p className={"text-small self-center hide-in-fullscreen" + fullscreen}>Back to <Link to={lessonpath} className={"hide-in-fullscreen" + fullscreen}>{this.state.title} lesson</Link>.</p>
              <FlashcardsModal fullscreen={this.props.fullscreen} />
            </div>
            <div>

              {/* Screenreader flashcard heading for context */}
              <div className="visually-hidden"><h3 id="flashcards-listbox-label">Carousel of lesson words and their strokes</h3></div>

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
                    aria-labelledby="flashcards-listbox-label"
                  >
                    <SlideNodes flashcards={this.state.flashcards} />
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
                  <div
                    className={
                      "block relative text-center fullscreen-button fullscreen-button-ghost" +
                      fullscreen
                    }
                  >
                    <label
                      className="de-emphasized flex items-center justify-center"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <input
                        className="absolute"
                        type="checkbox"
                        name="fullscreen"
                        id="fullscreen"
                        checked={this.props.fullscreen}
                        onChange={this.props.changeFullscreen}
                      />
                      {fullscreen ? "Leave fullscreen" : "Enter fullscreen"}
                    </label>
                  </div>
                </CarouselProvider>
              </div>



              <div className={"pt6 mw-584 mx-auto text-center hide-in-fullscreen" + fullscreen}>
                <StrokesForWords
                  fetchAndSetupGlobalDict={this.props.fetchAndSetupGlobalDict}
                  globalLookupDictionary={this.props.globalLookupDictionary}
                  globalLookupDictionaryLoaded={this.props.globalLookupDictionaryLoaded}
                  personalDictionaries={this.props.personalDictionaries}
                  userSettings={this.props.userSettings}
                />
              </div>

              <p className={"text-small text-center mt1 pt6 hide-in-fullscreen" + fullscreen}><a href={this.prefillSurveyLink()} className="mt0" target="_blank" rel="noopener noreferrer" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--flashcards--give-feedback">Give feedback on this flashcard (form opens in a new tab)</a>.</p>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

function FlashcardsWrapper(props) {
  const {
    appFetchAndSetupGlobalDict,
  } = useAppMethods();
  const updateFlashcardsProgress = useUpdateFlashcardsProgress();
  const changeFullscreen = useChangeFullscreen();

  return (
    <Flashcards
      {...props}
      changeFullscreen={changeFullscreen}
      fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
      updateFlashcardsProgress={updateFlashcardsProgress}
      personalDictionaries={props.personalDictionaries}
    />
  );
}

export default withAppMethods(
  withAtomsCompat(FlashcardsWrapper, [
    ["userSettings", userSettingsState],
    ["flashcardsMetWords", flashcardsMetWordsState],
    ["flashcardsProgress", flashcardsProgressState],
    ["fullscreen", fullscreenState],
  ])
);
