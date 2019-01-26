import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import RecommendationDescription from './RecommendationDescription';
import { IconExternal } from './Icon';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'

class RecommendationBox extends Component {
  render () {
    let recommendedNextLesson;
    let recommendedNextLessonHeading;
    let recommendedLink;
    let recommendedLinkTitle;
    let metadataStats;
    let studyType;
    let recommendedNextLessonCallToActionButton;

    if (this.props.recommendedNextLesson !== undefined && !this.props.loadingLessonIndex) {
      metadataStats = (
        <React.Fragment>
          {this.props.recommendedNextLesson.limitNumberOfWords} words | {this.props.recommendedNextLesson.repetitions} repetitions
        </React.Fragment>
      );

      studyType = this.props.recommendedNextLesson.studyType;
      if (studyType === "error") {
        metadataStats = (
          <React.Fragment>
            No recommendation.
          </React.Fragment>
        );
      }
      else if (studyType === "wildcard") {
        metadataStats = (
          <React.Fragment>
            External link.
          </React.Fragment>
        );
      }
      else if (studyType === "game") {
        metadataStats = (
          <React.Fragment>
            Increase your speed while breaking cargo
          </React.Fragment>
        );
      }
      else if (studyType === "compete") {
        metadataStats = (
          <React.Fragment>
            Increase your speed while racing against others
          </React.Fragment>
        );
      }
      else if (studyType === "break") {
        metadataStats = (
          <React.Fragment>
            Take 5&nbsp;minutes or come&nbsp;back in 4+&nbsp;hours.
          </React.Fragment>
        );
      }
      else if (this.props.recommendedNextLesson.repetitions === 1) {
        metadataStats = (
          <React.Fragment>
            {this.props.recommendedNextLesson.limitNumberOfWords} words | {this.props.recommendedNextLesson.repetitions} repetition
          </React.Fragment>
        );
      }

      if (this.props.recommendedNextLesson && this.props.recommendedNextLesson.lessonTitle && this.props.recommendedNextLesson.lessonTitle.length < 10) {
        metadataStats = (
          <React.Fragment>
            {this.props.recommendedNextLesson.limitNumberOfWords} words <br /> {this.props.recommendedNextLesson.repetitions} repetitions
          </React.Fragment>
        );
        if (this.props.recommendedNextLesson.repetitions === 1) {
          metadataStats = (
            <React.Fragment>
              {this.props.recommendedNextLesson.limitNumberOfWords} words <br /> {this.props.recommendedNextLesson.repetitions} repetition
            </React.Fragment>
          );
        }
      }

      switch (this.props.recommendedNextLesson.studyType) {
        case "error":
          recommendedNextLessonCallToActionButton = "Practice";
          recommendedNextLessonHeading = <h3>Recommended: error</h3>;
          break;
        case "practice":
          recommendedNextLessonCallToActionButton = "Practice";
          recommendedNextLessonHeading = <h3>Recommended: practice</h3>;
          break;
        case "drill":
          recommendedNextLessonCallToActionButton = "Drill";
          recommendedNextLessonHeading = <h3>Recommended: drill</h3>;
          break;
        case "revise":
          recommendedNextLessonCallToActionButton = "Revise";
          recommendedNextLessonHeading = <h3>Recommended: revise</h3>;
          break;
        case "discover":
          recommendedNextLessonCallToActionButton = "Discover";
          recommendedNextLessonHeading = <h3>Recommended: discover</h3>;
          break;
        case "break":
          recommendedNextLessonCallToActionButton = "Take a break";
          recommendedNextLessonHeading = <h3>Recommended: break</h3>;
          break;
        case "game":
          recommendedNextLessonCallToActionButton = "Play";
          recommendedNextLessonHeading = <h3>Recommended: game</h3>;
          break;
        case "compete":
          recommendedNextLessonCallToActionButton = "Compete";
          recommendedNextLessonHeading = <h3>Recommended: compete</h3>;
          break;
        default:
          recommendedNextLessonCallToActionButton = "Start now";
          recommendedNextLessonHeading = <h3>Recommended: practice</h3>;
          break;
      }

      if (this.props.recommendedNextLesson.link.startsWith('http')) {
        recommendedLink = (
          <GoogleAnalytics.OutboundLink
            eventLabel={recommendedNextLessonCallToActionButton}
            aria-label={recommendedNextLessonCallToActionButton + " (external link opens in new tab)"}
            to={this.props.recommendedNextLesson.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.props.startRecommendedStep}
            className="link-button dib"
            style={{lineHeight: 2}}
          >
            {recommendedNextLessonCallToActionButton}
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
          </GoogleAnalytics.OutboundLink>
        );
      } else {
        recommendedLink = (
          <Link onClick={this.props.startRecommendedStep} to={this.props.recommendedNextLesson.link} className="link-button dib" style={{lineHeight: 2}}>{recommendedNextLessonCallToActionButton}</Link>
        );
      }

      if (studyType === "error") {
        recommendedLinkTitle = "Unable to load recommendation";
        recommendedLink = <a href="." className="link-button dib" style={{lineHeight: 2}}>Refresh</a>
      } else {
        recommendedLinkTitle = this.props.recommendedNextLesson.linkTitle;
      }

      recommendedNextLesson = (
        <React.Fragment>
          {recommendedNextLessonHeading}
          <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
            <p className="text-right"><strong>{recommendedLinkTitle}</strong></p>
            <p className="text-right de-emphasized">{metadataStats}</p>
            <div className="flex flex-wrap justify-end">
              <button onClick={this.props.recommendAnotherLesson} className="de-emphasized-button pl3 pr3">Skip</button>
              <div className="text-right">
                {recommendedLink}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap content-start-ns">
            <div className="flex flex-wrap">
              <RecommendationDescription
                studyType={this.props.recommendedNextLesson.studyType}
                setAnnouncementMessage={this.props.setAnnouncementMessage}
              />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      recommendedNextLesson = (
        <React.Fragment>
          <h3>Recommended…</h3>
          <div className="bw-12 br-4 b--solid b--brand-primary p3 mb3">
            <p className="text-right"><strong>Loading…</strong></p>
            <p className="text-right de-emphasized"></p>
            <div className="flex flex-wrap justify-end">
              <button onClick={this.props.recommendAnotherLesson} className="de-emphasized-button pl3 pr3">Skip</button>
              <div className="text-right">
                <button disabled className="link-button dib" style={{lineHeight: 2}}>Loading…</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {recommendedNextLesson}
      </React.Fragment>
    );
  }
}

export default RecommendationBox;
