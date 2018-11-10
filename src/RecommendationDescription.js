import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { IconExternal } from './Icon';
import { Tooltip, } from 'react-tippy';
import 'react-tippy/dist/tippy.css'

class RecommendationDescription extends Component {
  render () {
    let description;

    switch (this.props.studyType) {
      case "error":
        description = (
          <p>
            Unable to fetch the recommendation course. Check your Internet connection and try <a href=".">refresh the page</a>.
          </p>
        );
        break;

      case "practice":
        description = (
          <p>
           Practice a longer lesson and mimic real usage as closely as possible. Write as fast as you can without causing misstrokes. Explore classic stories that use simple sentences and common words.
          </p>
        );
        break;

      case "drill":
        description = (
          <p>
            Regularly drill common words to build up your muscle memory and test your skills. Write as fast and furiously as you can, aiming for a high speed score. Pick specific drills that focus on a certain kind of brief or many similar words so you can associate them together.
          </p>
        );
        break;

      case "revise":
        description = (
          <p>
            Revise 50 briefs a day from a lesson with loads of words you want to memorise, like the top 10000 English words. Try to recall the briefs before revealing their strokes. Avoid fingerspelling or writing out the long forms of words, so you can memorise the best brief for every word.
          </p>
        );
        break;

      case "discover":
        description = (
          <p>
            Discover 5–15 new briefs a day from various lessons, revealing their strokes as you learn to write them. Write them slowly, concentrating on accuracy and forming good habits around how you stroke word parts.
          </p>
        );
        break;

      case "compete":
        description = (
          <p>
            To really push your speed and vocabulary, you might add some competition. Try{' '}
              <GoogleAnalytics.OutboundLink
                eventLabel="Type Racer"
                aria-label="Type Racer (external link opens in new tab)"
                to="https://play.typeracer.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="nowrap">Type Racer
                  <Tooltip
                    title="(external link opens in new tab)"
                    className=""
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                  </Tooltip>
                </span>
              </GoogleAnalytics.OutboundLink>.
          </p>
        );
        break;

      case "game":
        description = (
          <p>
            You’ve been so diligent! You might take a break from drilling and try a game like{' '}
              <GoogleAnalytics.OutboundLink
                eventLabel="Cargo Crisis"
                aria-label="Cargo Crisis (external link opens in new tab)"
                to="http://qwertysteno.com/Games/CargoCrisis.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="nowrap">Cargo Crisis
                  <Tooltip
                    title="(external link opens in new tab)"
                    className=""
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                  </Tooltip>
                </span>
              </GoogleAnalytics.OutboundLink>.
          </p>
        );
        break;

      case "wildcard":
        description = (
          <p>
            Well done! You’ve typed a lot of words today. You might rest your hands and your mind for now, and come back in 4+ hours.
          </p>
        );
        break;

      case "break":
        description = (
          <p>
            Well done! You’ve typed a lot of words today. You might rest your hands and your mind for now, and come back in 4+ hours.
          </p>
        );
        break;

      default:
        description = (
          <p>
            Practice writing as fast as you can without causing misstrokes using simple sentences and common words.
          </p>
        );
        break;
    }

    return (
      <React.Fragment>
        {description}
      </React.Fragment>
    );
  }
}

export default RecommendationDescription;
