import React, { Component } from 'react';

class FlashcardsCarouselActionButtons extends Component {
  render () {
    let currentSlideContentType = this.props.currentSlideContentType;
    let ButtonNext = this.props.ButtonNext;
    let numberOfFlashcards = this.props.numberOfFlashcards;

    return (
      <React.Fragment>
        <div className="text-center">
          { currentSlideContentType === 'phrase' && numberOfFlashcards > 0 ? <ButtonNext className="link-button carousel__button carousel__button--skip" type="button" onClick={this.props.nextSlide} data-flashcard-feedback="show" value={this.props.currentSlideContent} aria-label="Next card" data-unfocus="true" id="showButton" ref={(showButton) => { this.showButton = showButton; }}>Show</ButtonNext> : null }

          { currentSlideContentType === 'stroke' && numberOfFlashcards > 0 ?
              <>
                <ButtonNext className="link-button carousel__button carousel__button--easy mr1" type="button" onClick={this.props.nextSlide} data-flashcard-feedback="easy" value={this.props.currentSlideContent} aria-label="Easy, Next card" data-unfocus="true">Easy</ButtonNext>
              </> : null }
          { currentSlideContentType === 'stroke' && numberOfFlashcards > 0 ?
              <>
                <ButtonNext className="link-button carousel__button carousel__button--hard ml1" type="button" onClick={this.props.nextSlide} data-flashcard-feedback="hard" value={this.props.currentSlideContent} aria-label="Hard, Next card" data-unfocus="true" id="hardButton" ref={(hardButton) => { this.hardButton = hardButton; }}>Hard</ButtonNext>
              </>
              :
              null
          }

          {/* Finished buttons; they also keep space and avoid subsequent content moving up on finished step */}
          { currentSlideContentType === 'finished' && numberOfFlashcards > 0 ? <button onClick={this.props.setupFlashCards} className="mr1 link-button carousel__button" data-restart="true" data-unfocus="true">Restart</button> : null }
          { currentSlideContentType === 'finished' && numberOfFlashcards > 0 ? <button onClick={this.props.setupFlashCards} className="ml1 link-button carousel__button" data-shuffle="true" data-unfocus="true" id="shuffleButton" ref={(shuffleButton) => { this.shuffleButton = shuffleButton; }}>Shuffle</button> : null }

          { numberOfFlashcards === 0 ? <p className="mt1 mb0">There are no more flashcards to practice at the moment.</p> : null }
        </div>
      </React.Fragment>
    );
  }
}

export default FlashcardsCarouselActionButtons;
