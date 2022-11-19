import React, { useEffect, useRef, useState } from "react";
import GoogleAnalytics from "react-ga";
import { Link } from "react-router-dom";
import { IconExternal } from "../../components/Icon";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import typeyTypeDemoGIF from "../../images/typey-type-for-stenographers-demo.gif";
import typeyTypeyDemoCoverImage from "../../images/typey-type-for-stenographers-demo-cover-image.png";

type Props = {
  setAnnouncementMessage: () => void;
};

const Home = ({ setAnnouncementMessage }: Props) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  const [typeyTypeDemoSrc, setTypeyTypeDemoSrc] = useState(typeyTypeDemoGIF);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  const toggleDemoGIF = () =>
    setTypeyTypeDemoSrc(
      typeyTypeDemoSrc === typeyTypeyDemoCoverImage
        ? typeyTypeDemoGIF
        : typeyTypeyDemoCoverImage
    );

  return (
    <div>
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2
                  id="home-typey-type-for-stenographers"
                  ref={mainHeading}
                  tabIndex={-1}
                >
                  Typey Type for Stenographers
                </h2>
              </header>
            </div>
          </div>
        </div>
        <div className="strapline text-vertical p0 m0 lh-single">
          Typey Type for Stenographers
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <div className="relative">
                <img
                  src={typeyTypeDemoSrc}
                  className="homepage-demo-lg"
                  alt="Demo of Typey Type for Stenographers in action"
                  onClick={toggleDemoGIF}
                />
              </div>
              <h3 className="tiny-rule">What is stenography?</h3>
              <p>
                The process of writing shorthand is called{" "}
                <strong>stenography</strong>. Want to write over 100 words per
                minute? Grab yourself a fancy keyboard and start learning
                stenography!
              </p>
              <p>
                Typey&nbsp;Type for Stenographers is a free typing app designed
                to help {/* @ts-ignore */}
                <Tooltip
                  animation="shift"
                  arrow="true"
                  className="abbr"
                  duration="200"
                  tabIndex={0}
                  tag="abbr"
                  theme="didoesdigital"
                  title="stenography"
                  trigger="mouseenter focus click"
                  onShow={setAnnouncementMessage}
                >
                  steno
                </Tooltip>{" "}
                students practise and master stenography.
              </p>
              <div className="relative">
                <img
                  src={typeyTypeDemoSrc}
                  className="homepage-demo-xs"
                  alt="Demo of Typey Type for Stenographers in action"
                  onClick={toggleDemoGIF}
                />
              </div>
              <Link
                to="/support"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584 ml-auto text-right">
              <h3>Steno students</h3>
              <p>
                After learning a little bit of steno theory, check out
                Typey&nbsp;Type’s fundamental{" "}
                <Link to="/lessons/">lessons</Link>, starting with the{" "}
                <Link to="/lessons/fundamentals/introduction/">
                  Introduction
                </Link>{" "}
                lesson. Before you start typing, customise “your settings”. Set
                spaces match your steno settings: spaces before words, spaces
                after words, or ignore spaces&nbsp;completely.
              </p>
              <Link
                to="/lessons/fundamentals/introduction/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Start typing
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <h3 className="overline">Discover</h3>
              <p>
                Discover 5–15 new briefs a day from various lessons, revealing
                their strokes as you learn to write them. Write them slowly,
                concentrating on accuracy and forming good habits around how you
                stroke word parts.
              </p>
              <Link
                to="/lessons/fundamentals/introduction/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Discover
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584 ml-auto text-right">
              <h3 className="overline">Revise</h3>
              <p>
                Revise 50 briefs a day from a lesson with loads of words you
                want to memorise, like the top 1000 words. Try to recall the
                briefs before revealing their strokes. Avoid fingerspelling or
                writing out the long forms of words. This helps you memorise the
                best brief for every word.{" "}
              </p>
              <Link
                to="/lessons/drills/top-10000-project-gutenberg-words/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Revise
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <h3 className="overline">Drill</h3>
              <p>
                Regularly drill common words to build up your muscle memory and
                test your skills. Write as fast and furiously as you can, aiming
                for a high speed score. Pick specific drills that focus on a
                certain kind of brief or many similar words so you can associate
                them together.
              </p>
              <Link
                to="/lessons/drills/pronouns/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Drill
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584 ml-auto text-right">
              <h3 className="overline">Practise</h3>
              <p>
                Finally, practise longer lessons to mimic real usage as closely
                as possible. Write as fast as you can without causing
                misstrokes. Explore classic stories that use simple sentences
                and common words.
              </p>
              <Link
                to="/lessons/stories/fables/belling-the-cat/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Practise
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <h3>Track your progress</h3>
              <p>
                Typey&nbsp;Type tracks your progress automatically without
                signing in. To keep your progress safe, however, you need to
                save it out of Typey&nbsp;Type after practise.
              </p>
              <Link
                to="/progress/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Your progress
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584 ml-auto text-right">
              <h3 className="tiny-rule--adjacent">Custom material</h3>
              <p>
                Practise any text you like. Add a list of words to create a
                custom lesson using Plover theory, or supply words and strokes
                using your own theory and material.
              </p>
              <Link
                to="/lessons/custom"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Custom lessons
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <h3>Flashcards</h3>
              <p>
                Study briefs on the go using flashcards designed for
                mobile&nbsp;devices.
              </p>
              <Link
                to="/flashcards/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Flashcards
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584 ml-auto text-right">
              <h3>Dictionaries</h3>
              <p>
                Besides Typey&nbsp;Type’s dictionary, you can find Plover,
                community, and lesson dictionaries.
              </p>
              <Link
                to="/dictionaries/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Dictionaries
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <h3>Your steno journey</h3>
              <p>
                You can follow recommendations tailored to you and your skill
                level on your journey to mastering stenography.
              </p>
              <Link
                to="/progress"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Your progress
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584 ml-auto text-right">
              <h3>Rest</h3>
              <p>Rest your hands and your mind with a 5-minute break timer.</p>
              <Link
                to="/break/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Take a break
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <h3>Your settings</h3>
              <p>
                Choose the right settings for you. Try other steno layouts, blur
                words, or have words spoken to you.
              </p>
              <Link
                to="/lessons/fundamentals/introduction/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584 ml-auto text-right">
              <h3>Writer</h3>
              <p>
                Try steno out in the browser without any software. You can
                prepare an SVG diagram to download.
              </p>
              <Link
                to="/writer/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Writer
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <h3>Lookup</h3>
              <p>
                You can see a variety of strokes for words, numbers,
                punctuation, letters, and symbols.
              </p>
              <Link
                to="/lookup/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Lookup
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584 ml-auto text-right">
              <h3>Games</h3>
              <p>Play games to mix it up, have fun, and increase your speed.</p>
              <Link
                to="/games/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Play
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-info landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="mw-584">
              <h3>Want to get involved?</h3>
              <p>
                Support DiDoesDigital, create lessons, or share your feedback.
                Every bit helps.
              </p>
              <Link
                to="/contribute/"
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Contribute
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white landing-page-section">
          <div className="p3 mx-auto mw-1024">
            <div className="text-center">
              <h3 id="steno-news">Keep up with news</h3>
              <p>
                Sign up for{" "}
                <GoogleAnalytics.OutboundLink
                  eventLabel="DiDoesDigital: Typey Type updates and steno news (external link opens in new tab)"
                  to="https://didoesdigital.com/#newsletter"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Typey Type updates and steno news (external link opens in new tab)"
                >
                  Typey&nbsp;Type updates and steno news
                  {/* @ts-ignore */}
                  <Tooltip
                    animation="shift"
                    arrow="true"
                    className=""
                    duration="200"
                    tabIndex={0}
                    tag="span"
                    theme="didoesdigital"
                    title="External link opens in new tab"
                    trigger="mouseenter focus click"
                    onShow={setAnnouncementMessage}
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
              {}
              <a
                href="https://didoesdigital.com/#newsletter"
                className="link-button dib"
                style={{ lineHeight: 2 }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Steno news (external link opens in new tab)"
              >
                Steno news
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
