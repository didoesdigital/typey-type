import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import OutboundLink from "../../components/OutboundLink";
import StrokesForWords from "../../components/StrokesForWords";
import { IconExternal } from "../../components/Icon";
import { Tooltip } from "react-tippy";
import Subheader from "../../components/Subheader";
import useAnnounceTooltip from "../../components/Announcer/useAnnounceTooltip";

import type {
  Experiments,
  GlobalUserSettings,
  LookupDictWithNamespacedDicts,
  PrettyLessonTitle,
  StenoDictionary,
  UserSettings,
} from "../../types";

/** Example: "/lessons/collections/tech/react/" */
type DictLink = string;

type Props = {
  dictionaryIndex: any;
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
  globalLookupDictionaryLoaded: boolean;
  globalUserSettings: GlobalUserSettings;
  setDictionaryIndex: () => void;
  stenohintsonthefly: Pick<Experiments, "stenohintsonthefly">;
  userSettings: UserSettings;
};

const isInternalDictLink = (dictLink: DictLink) =>
  dictLink.startsWith("/typey-type") ||
  dictLink.startsWith("/dictionaries/") ||
  dictLink.startsWith("/lessons/") || // This is deprecated
  dictLink.startsWith("/support");

const getInternalLink = (dictLink: DictLink, dictTitle: PrettyLessonTitle) =>
  isInternalDictLink(dictLink) ? (
    `${process.env.PUBLIC_URL}${dictLink}`.startsWith(
      process.env.PUBLIC_URL + "/lessons" // This is deprecated
    ) ? (
      <Link to={dictLink} aria-label={"Lesson: " + dictTitle}>
        Lesson
      </Link>
    ) : (
      <Link to={dictLink} aria-label={"Learn more about " + dictTitle}>
        Learn more
      </Link>
    )
  ) : null;

const getExternalLink = (
  dictLink: DictLink,
  dictTitle: PrettyLessonTitle,
  announceTooltip: (this: HTMLElement) => void
) =>
  isInternalDictLink(dictLink) ? null : (
    <a
      href={dictLink}
      aria-label={"Learn more about " + dictTitle}
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn more
      {/* @ts-ignore */}
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
        onShow={announceTooltip}
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
  );

const DictionariesIndex = ({
  dictionaryIndex,
  setDictionaryIndex,
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  globalUserSettings,
  stenohintsonthefly,
  userSettings,
}: Props) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const announceTooltip = useAnnounceTooltip();

  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (dictionaryIndex && dictionaryIndex.length < 2) {
      setDictionaryIndex();
    }

    // FIXME: setDictionaryIndex in dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictionaryIndex]);

  const linkList = dictionaryIndex.map((dictionary: StenoDictionary) => {
    const author =
      dictionary.author && dictionary.author.length > 0
        ? dictionary.author
        : "Typey Type";

    const title =
      dictionary.title && dictionary.title.length > 0
        ? dictionary.title
        : "dictionary";

    const subtitle =
      dictionary.subtitle && dictionary.subtitle.length > 0
        ? ": " + dictionary.subtitle
        : "";

    const learnMoreLink =
      dictionary.link && dictionary.link.length > 0
        ? getInternalLink(dictionary.link, title) ||
          getExternalLink(dictionary.link, dictionary.title, announceTooltip)
        : null;

    const dictionarypath = dictionary.path
      .replace(/lesson.txt/, "lesson/") // This is deprecated
      .replace(/.json/, "/");

    return (
      <li className="unstyled-list-item mb1" key={dictionary.path}>
        <Link
          to={`${dictionarypath}`
            .replace(/path\.txt$/, "")
            .replace(/\/{2,}/g, "/")}
          id={"ga--dictionary-index-" + dictionarypath.replace(/[/.]/g, "-")}
        >
          {author}’s {dictionary.title}
          {subtitle}
        </Link>
        <span>
          {" "}
          · 
          {learnMoreLink}
        </span>
      </li>
    );
  });

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              Dictionaries
            </h2>
          </header>
        </div>
      </Subheader>
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
                <OutboundLink
                  eventLabel="Di’s Steno Dictionaries repo"
                  aria-label="Di’s Steno Dictionaries repo (external link opens in new tab)"
                  to="https://github.com/didoesdigital/steno-dictionaries"
                >
                  Di’s Steno Dictionaries{" "}
                  <span className="whitespace-nowrap">
                    repo
                    {/* @ts-ignore */}
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
                      onShow={announceTooltip}
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
                </OutboundLink>
                .
              </p>
              <h4>Stroke hints</h4>
              <p>
                Typey&nbsp;Type’s stroke hints look for the shortest briefs with
                penalties for briefs using multiple strokes, the star (
                <code>*</code>) key, and non-standard prefix or suffix strokes.
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
                dictionary. Typey&nbsp;Type’s dictionary uses these entries when
                Plover has no entry for a word. Otherwise, you can fingerspell.
              </p>

              <h4>Corrections</h4>
              <p>
                If you notice any odd strokes,{" "}
                <OutboundLink
                  eventLabel="post to the feedback form"
                  aria-label="post to the feedback form (external link opens in new tab)"
                  to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
                >
                  use the feedback{" "}
                  <span className="whitespace-nowrap">
                    form
                    {/* @ts-ignore */}
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
                      onShow={announceTooltip}
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
                </OutboundLink>
                .
              </p>

              <p className="text-small">
                You might also be interested in{" "}
                <OutboundLink
                  eventLabel="Stenodict"
                  aria-label="Stenodict (external link opens in new tab)"
                  to="http://www.openstenoproject.org/stenodict/"
                >
                  Stenodict
                  {/* @ts-ignore */}
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
                    onShow={announceTooltip}
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
                </OutboundLink>
                .
              </p>
            </div>

            <div className="mw-584">
              <h3>Typey&nbsp;Type dictionaries</h3>
              <ul className="unstyled-list">{linkList}</ul>

              <p>
                Want to add another dictionary to this list?{" "}
                <OutboundLink
                  eventLabel="Typey Type for Stenographers dictionary feedback form"
                  aria-label="Share your feedback (form opens in new tab)"
                  to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
                >
                  Share your dictionary
                  {/* @ts-ignore */}
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
                    onShow={announceTooltip}
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
                </OutboundLink>
                .
              </p>

              <p>
                For lesson-specific dictionaries, you can now “Download lesson
                hints as a dictionary” from individual lesson pages. For
                example, see the bottom of the{" "}
                <Link to="/lessons/drills/top-10000-project-gutenberg-words/">
                  Top 10000 Project Gutenberg words lesson
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt1 mw-336 flex-grow">
            <h3 className="mt3">Custom dictionaries</h3>
            <p>
              To see your own stroke hints in lessons,{" "}
              <Link to="/dictionaries/management">add your dictionaries</Link>.
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
              and strokes to a <Link to="/lessons/custom">custom lesson</Link>.
              The briefs shown will match whatever strokes you provide.
            </p>

            <h4>Share your dictionaries</h4>
            <p>
              To help the open steno community and Typey&nbsp;Type grow even
              faster, add your custom dictionaries to the{" "}
              <OutboundLink
                eventLabel="community’s dictionaries"
                aria-label="community’s dictionaries (external link opens in new tab)"
                to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
              >
                community’s{" "}
                <span className="whitespace-nowrap">
                  dictionaries
                  {/* @ts-ignore */}
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
                    onShow={announceTooltip}
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
              </OutboundLink>
              .
            </p>
            <StrokesForWords
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              globalUserSettings={globalUserSettings}
              userSettings={userSettings}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DictionariesIndex;
