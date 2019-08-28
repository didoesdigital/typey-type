import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import AnimateHeight from 'react-animate-height';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'

class SurveyLinkPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecommendationsSurveyLink: true
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  hideRecommendationsSurveyLink(event) {
    GoogleAnalytics.event({
      category: 'Surveys',
      action: 'Hide recommendations survey link',
      label: 'Hidden'
    });

    this.setState({showRecommendationsSurveyLink: false});
  }

  render () {
    return (
      <AnimateHeight
        duration={ 300 }
        height={ this.state.showRecommendationsSurveyLink ? 'auto' : '0' }
        ease={'cubic-bezier(0.645, 0.045, 0.355, 1)'}
      >
        <div className={this.state.showRecommendationsSurveyLink ? "recommendation-survey-link--shown" : "recommendation-survey-link--hidden"}>
          <p className="panel p3 mb3 mt4 relative">
            <span className="bg-danger">Help improve Typey Type!</span>
            <button onClick={this.hideRecommendationsSurveyLink.bind(this)} className="hide-recommendation-link absolute right-0 p0 mr1">Hide</button>
            <br />
            <GoogleAnalytics.OutboundLink
              eventLabel="Recommendations survey"
              aria-label="Survey about Typey Type recommendations (external link opens in new tab)"
              to="https://docs.google.com/forms/d/e/1FAIpQLSf3XiHpSUTdgkGERdpoyqAIFA8t9YOGs8TvuU_d0bfsRe2vQA/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={this.state.showRecommendationsSurveyLink ? '0' : '-1'}
            >
              Give feedback on these <span className="nowrap">recommendations
                <Tooltip
                  title="Opens in new tab"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex={this.state.showRecommendationsSurveyLink ? '0' : '-1'}
                  tag="span"
                  theme="didoesdigital"
                  trigger={this.state.showRecommendationsSurveyLink ? 'mouseenter focus click' : ''}
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip>
              </span>
            </GoogleAnalytics.OutboundLink>
          </p>
        </div>
      </AnimateHeight>
    );
  }
}

export default SurveyLinkPanel;
