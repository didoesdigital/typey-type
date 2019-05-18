import React, { Component } from 'react';

class FlashcardsCarouselActionButtons extends Component {
  render () {
    let currentSlideContentType = this.props.currentSlideContentType;
    let ButtonNext = this.props.ButtonNext;

    return (
      <React.Fragment>
        <div className="text-center">
          { currentSlideContentType === 'phrase' ? <ButtonNext className="link-button carousel__button carousel__button--skip" type="button" onClick={this.props.nextSlide} value={this.props.currentSlideContent} aria-label="Next card" data-unfocus="true" id="showButton" ref={(showButton) => { this.showButton = showButton; }}>Show</ButtonNext> : null }

          { this.props.currentSlideContentType === 'stroke' ?
              <>
                <ButtonNext className="link-button carousel__button carousel__button--easy mr1" type="button" onClick={this.props.nextSlide} data-flashcard-feedback="easy" value={this.props.currentSlideContent} aria-label="Easy, Next card" data-unfocus="true">Easy</ButtonNext>
              </> : null }
          { currentSlideContentType === 'stroke' ?
              <>
                <ButtonNext className="link-button carousel__button carousel__button--hard ml1" type="button" onClick={this.props.nextSlide} data-flashcard-feedback="hard" value={this.props.currentSlideContent} aria-label="Hard, Next card" data-unfocus="true" id="hardButton" ref={(hardButton) => { this.hardButton = hardButton; }}>Hard</ButtonNext>
              </>
              :
              null
          }

          {/* Finished buttons; they also keep space and avoid subsequent content moving up on finished step */}
          { currentSlideContentType === 'finished' ? <button onClick={this.props.setupFlashCards} className="mr1 link-button carousel__button" data-unfocus="true">Restart</button> : null }
          { currentSlideContentType === 'finished' ? <button onClick={this.props.setupFlashCards} className="ml1 link-button carousel__button" data-shuffle="true" data-unfocus="true" id="shuffleButton" ref={(shuffleButton) => { this.shuffleButton = shuffleButton; }}>Shuffle</button> : null }
        </div>
      </React.Fragment>
    );
  }
}

export default FlashcardsCarouselActionButtons;
