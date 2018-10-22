import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';
import {
  fetchDictionaryIndex,
} from './typey-type';

class DictionariesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaryIndex: [{
        "title": "Typey Type",
        "category": "Typey Type",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/dictionaries/typey-type/typey-type.json"
      },
      {
        "title": "Steno",
        "category": "Drills",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/dictionaries/lessons/drills/steno/steno.json"
      }]
    }
  }


  componentDidMount() {
    fetchDictionaryIndex().then((json) => {
      this.setState({ dictionaryIndex: json })
    });

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    const linkList = this.state.dictionaryIndex.map( (dictionary, index, array) => {
      let author = 'Typey Type';
      if (dictionary.author && dictionary.author.length > 0) {
        author = dictionary.author;
      }
      let title = 'dictionary';
      if (dictionary.title && dictionary.title.length > 0) {
        title = dictionary.title;
      }
      let subtitle = '';
      if (dictionary.subtitle && dictionary.subtitle.length > 0) {
        subtitle = ': '+dictionary.subtitle;
      }
      let learnMoreLink = [];
      if (dictionary.link && dictionary.link.length > 0) {
        let ariaLabel = "Learn more about " + title;
        learnMoreLink = (<span> · <a href={dictionary.link} aria-label={ariaLabel}>Learn more</a></span>);
      }
      let dictionarypath = dictionary.path;
      dictionarypath = dictionarypath.replace(/lesson.txt/,'lesson/');
      dictionarypath = dictionarypath.replace(/.json/,'/');

      return(
        <li className="unstyled-list-item" key={ dictionary.path }>
          <Link to={`${dictionarypath}`.replace(/path\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--dictionary-index-'+dictionarypath.replace(/[/.]/g,'-')}>{author}’s {dictionary.title}{subtitle}</Link>{learnMoreLink}
        </li>
      )
    });

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Dictionaries</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <h3>Custom dictionaries</h3>
          <p>To help the open steno community and Typey&nbsp;Type grow even faster, add your custom dictionaries to the{' '}
            <GoogleAnalytics.OutboundLink
              eventLabel="community’s dictionaries"
              aria-label="community’s dictionaries (external link opens in new tab)"
              to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
              target="_blank">
              community’s dictionaries
              <Tooltip
                title="Opens in a new tab"
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
          <p className="text-small">You might also be interested in{' '}
            <GoogleAnalytics.OutboundLink
              eventLabel="Stenodict"
              aria-label="Stenodict (external link opens in new tab)"
              to="http://www.openstenoproject.org/stenodict/"
              target="_blank">
              Stenodict
              <Tooltip
                title="Opens in a new tab"
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

          <h3>Dictionaries</h3>
          <ul className="unstyled-list">{linkList}</ul>

          <p>Want to add another dictionary to this list?{' '}
            <GoogleAnalytics.OutboundLink
              eventLabel="Typey Type for Stenographers dictionary feedback form"
              aria-label="Share your feedback (form opens in new tab)"
              to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share your dictionary
              <Tooltip
                title="(form opens in new tab)"
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
      </main>
    )
  }
}

export default DictionariesIndex;
