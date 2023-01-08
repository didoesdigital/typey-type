import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleAnalytics from "react-ga";
import StrokesForWords from "../../components/StrokesForWords";
import { IconExternal } from "../../components/Icon";
import { Tooltip } from "react-tippy";

class DictionariesIndex extends Component {
  componentDidMount() {
    if (this.props.dictionaryIndex && this.props.dictionaryIndex.length < 2) {
      this.props.setDictionaryIndex();
    }

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    const linkList = this.props.dictionaryIndex.map(
      (dictionary, index, array) => {
        let author = "Typey Type";
        if (dictionary.author && dictionary.author.length > 0) {
          author = dictionary.author;
        }
        let title = "dictionary";
        if (dictionary.title && dictionary.title.length > 0) {
          title = dictionary.title;
        }
        let subtitle = "";
        if (dictionary.subtitle && dictionary.subtitle.length > 0) {
          subtitle = ": " + dictionary.subtitle;
        }

        let learnMoreLink = [];

        if (dictionary.link && dictionary.link.length > 0) {
          let ariaLabel = "Learn more about " + title;

          if (
            dictionary.link.startsWith("/typey-type") ||
            dictionary.link.startsWith("/dictionaries/") ||
            dictionary.link.startsWith("/lessons/") ||
            dictionary.link.startsWith("/support")
          ) {
            learnMoreLink = (
              <span>
                {" "}
                · 
                <Link to={dictionary.link} aria-label={ariaLabel}>
                  Learn more
                </Link>
              </span>
            );
            if (dictionary.link.startsWith("/lessons")) {
              learnMoreLink = (
                <span>
                  {" "}
                  · 
                  <Link
                    to={dictionary.link}
                    aria-label={"Lesson: " + dictionary.title}
                  >
                    Lesson
                  </Link>
                </span>
              );
            }
          } else {
            learnMoreLink = (
              <span>
                {" "}
                · 
                <a
                  href={dictionary.link}
                  aria-label={ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                  <Tooltip
                    title="Opens in a new tab"
                    animation="shift"
                    arrow="true"
                    className=""
                    duration="200"
                    tabIndex={0}
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal
                      ariaHidden="true"
                      role="presentation"
                      iconWidth="24"
                      iconHeight="24"
                      className="ml1 svg-icon-wrapper svg-baseline"
                      iconTitle=""
                    />
                  </Tooltip>
                </a>
              </span>
            );
          }
        }
        let dictionarypath = dictionary.path;
        dictionarypath = dictionarypath.replace(/lesson.txt/, "lesson/");
        dictionarypath = dictionarypath.replace(/.json/, "/");

        return (
          <li className="unstyled-list-item mb1" key={dictionary.path}>
            <Link
              to={`${dictionarypath}`
                .replace(/path\.txt$/, "")
                .replace(/\/{2,}/g, "/")}
              id={
                "ga--dictionary-index-" + dictionarypath.replace(/[/.]/g, "-")
              }
            >
              {author}’s {dictionary.title}
              {subtitle}
            </Link>
            {learnMoreLink}
          </li>
        );
      }
    );

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2
                  ref={(heading) => {
                    this.mainHeading = heading;
                  }}
                  tabIndex={-1}
                >
                  Dictionaries
                </h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="flex flex-wrap justify-between">
            <div>
              <div className="mw-584">
                <h3 id="typey-type-dictionary">Typey&nbsp;Type dictionary</h3>
                <p>
                  <Link to="/dictionaries/typey-type/typey-type/">
                    Typey&nbsp;Type’s dictionary
                  </Link>{" "}
                  removes many misstrokes and mimics the{" "}
                  <strong>Plover version 4 dictionary</strong>.
                </p>
                <p>
                  You can use Plover’s dictionary or you can use use Di’s
                  dictionaries that power Typey Type’s stroke suggestions from{" "}
                  <GoogleAnalytics.OutboundLink
                    eventLabel="Di’s Steno Dictionaries repo"
                    aria-label="Di’s Steno Dictionaries repo (external link opens in new tab)"
                    to="https://github.com/didoesdigital/steno-dictionaries"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Di’s Steno Dictionaries{" "}
                    <span className="whitespace-nowrap">
                      repo
                      <Tooltip
                        title="Opens in a new tab"
                        animation="shift"
                        arrow="true"
                        className=""
                        duration="200"
                        tabIndex={0}
                        tag="span"
                        theme="didoesdigital"
                        trigger="mouseenter focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        <IconExternal
                          ariaHidden="true"
                          role="presentation"
                          iconWidth="24"
                          iconHeight="24"
                          className="ml1 svg-icon-wrapper svg-baseline"
                          iconTitle=""
                        />
                      </Tooltip>
                    </span>
                  </GoogleAnalytics.OutboundLink>
                  .
                </p>
                <h4>Stroke hints</h4>
                <p>
                  Typey&nbsp;Type’s stroke hints look for the shortest briefs
                  with penalties for briefs using multiple strokes, the star (
                  <code>*</code>) key, and non-standard prefix or suffix
                  strokes.
                </p>

                <h4>British English spelling</h4>
                <p>
                  The{" "}
                  <Link to="/lessons/drills/top-10000-project-gutenberg-words/">
                    Top 10000 Project Gutenberg words lesson
                  </Link>{" "}
                  and stories lessons like Aesop’s Fables use British English
                  spellings for words such as “neighbour”. For these you can use
                  the{" "}
                  <Link to="/dictionaries/didoesdigital/dict-en-AU-with-extra-stroke/">
                    Australian English with extra strokes
                  </Link>{" "}
                  dictionary. Typey&nbsp;Type’s dictionary uses these entries
                  when Plover has no entry for a word. Otherwise, you can
                  fingerspell.
                </p>

                <h4>Corrections</h4>
                <p>
                  If you notice any odd strokes,{" "}
                  <GoogleAnalytics.OutboundLink
                    eventLabel="post to the feedback form"
                    aria-label="post to the feedback form (external link opens in new tab)"
                    to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    use the feedback{" "}
                    <span className="whitespace-nowrap">
                      form
                      <Tooltip
                        title="(external link opens in new tab)"
                        className=""
                        animation="shift"
                        arrow="true"
                        duration="200"
                        tabIndex={0}
                        tag="span"
                        theme="didoesdigital"
                        trigger="mouseenter focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        <IconExternal
                          ariaHidden="true"
                          role="presentation"
                          iconWidth="24"
                          iconHeight="24"
                          className="ml1 svg-icon-wrapper svg-baseline"
                          iconTitle=""
                        />
                      </Tooltip>
                    </span>
                  </GoogleAnalytics.OutboundLink>
                  .
                </p>

                <p className="text-small">
                  You might also be interested in{" "}
                  <GoogleAnalytics.OutboundLink
                    eventLabel="Stenodict"
                    aria-label="Stenodict (external link opens in new tab)"
                    to="http://www.openstenoproject.org/stenodict/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Stenodict
                    <Tooltip
                      title="Opens in a new tab"
                      animation="shift"
                      arrow="true"
                      className=""
                      duration="200"
                      tabIndex={0}
                      tag="span"
                      theme="didoesdigital"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >
                      <IconExternal
                        ariaHidden="true"
                        role="presentation"
                        iconWidth="24"
                        iconHeight="24"
                        className="ml1 svg-icon-wrapper svg-baseline"
                        iconTitle=""
                      />
                    </Tooltip>
                  </GoogleAnalytics.OutboundLink>
                  .
                </p>
              </div>

              <div className="mw-584">
                <h3>Typey&nbsp;Type dictionaries</h3>
                <ul className="unstyled-list">{linkList}</ul>

                <p>
                  Want to add another dictionary to this list?{" "}
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
                      tabIndex={0}
                      tag="span"
                      theme="didoesdigital"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >
                      <IconExternal
                        ariaHidden="true"
                        role="presentation"
                        iconWidth="24"
                        iconHeight="24"
                        className="ml1 svg-icon-wrapper svg-baseline"
                        iconTitle=""
                      />
                    </Tooltip>
                  </GoogleAnalytics.OutboundLink>
                  .
                </p>
              </div>
            </div>
            <div className="mt1 mw-336 flex-grow">
              <h3 className="mt3">Custom dictionaries</h3>
              <p>
                To see your own stroke hints in lessons,{" "}
                <Link to="/dictionaries/management">add your dictionaries</Link>
                .
              </p>
              <p>
                <Link
                  to="/dictionaries/management"
                  className="link-button dib mt1"
                  style={{ lineHeight: 2 }}
                  id="ga--dictionaries-index--add-dictionaries"
                >
                  Add your dictionaries
                </Link>
              </p>

              <h4>Use custom lessons</h4>
              <p>
                To use a different dictionary or steno theory, upload your words
                and strokes to a <Link to="/lessons/custom">custom lesson</Link>
                . The briefs shown will match whatever strokes you provide.
              </p>

              <h4>Share your dictionaries</h4>
              <p>
                To help the open steno community and Typey&nbsp;Type grow even
                faster, add your custom dictionaries to the{" "}
                <GoogleAnalytics.OutboundLink
                  eventLabel="community’s dictionaries"
                  aria-label="community’s dictionaries (external link opens in new tab)"
                  to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  community’s{" "}
                  <span className="whitespace-nowrap">
                    dictionaries
                    <Tooltip
                      title="Opens in a new tab"
                      animation="shift"
                      arrow="true"
                      className=""
                      duration="200"
                      tabIndex={0}
                      tag="span"
                      theme="didoesdigital"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >
                      <IconExternal
                        ariaHidden="true"
                        role="presentation"
                        iconWidth="24"
                        iconHeight="24"
                        className="ml1 svg-icon-wrapper svg-baseline"
                        iconTitle=""
                      />
                    </Tooltip>
                  </span>
                </GoogleAnalytics.OutboundLink>
                .
              </p>
              <StrokesForWords
                fetchAndSetupGlobalDict={this.props.fetchAndSetupGlobalDict}
                globalLookupDictionary={this.props.globalLookupDictionary}
                globalLookupDictionaryLoaded={
                  this.props.globalLookupDictionaryLoaded
                }
                globalUserSettings={this.props.globalUserSettings}
                personalDictionaries={this.props.personalDictionaries}
                stenoHintsOnTheFly={this.props.stenohintsonthefly}
                updateGlobalLookupDictionary={
                  this.props.updateGlobalLookupDictionary
                }
                updatePersonalDictionaries={
                  this.props.updatePersonalDictionaries
                }
                userSettings={this.props.userSettings}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default DictionariesIndex;
