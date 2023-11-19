import React, { useEffect, useRef } from "react";
import OutboundLink from "../../components/OutboundLink";
import { Link } from "react-router-dom";
import { IconExternal } from "../../components/Icon";
import { Tooltip } from "react-tippy";
import Subheader from "../../components/Subheader";
import useAnnounceTooltip from "../../components/Announcer/useAnnounceTooltip";

const Contribute = () => {
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const announceTooltip = useAnnounceTooltip();

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1} id="contribute-to-typey-type">
              Contribute to Typey&nbsp;Type
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024 type-face--sans-serif">
        <div className="mw-568">
          <p className="mt3">Thanks for your interest in Typey&nbsp;Type!</p>

          <h3 id="patreon">Patreon</h3>
          <p>
            You can support my efforts on{" "}
            <OutboundLink
              eventLabel="Patreon"
              aria-label="Patreon (external link opens in new tab)"
              to="https://www.patreon.com/didoesdigital"
            >
              Patreon
              {/* @ts-ignore */}
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
            . A monthly donation helps me build more lessons and features to
            help you fast-track your steno progress.
          </p>

          <h3 id="lessons">Lessons</h3>
          <p>
            You can create your own{" "}
            <Link to="/lessons/custom">custom lesson</Link> and add it to the{" "}
            <a
              className=""
              href="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="whitespace-nowrap">
                community’s lessons
                {/* @ts-ignore */}
                <Tooltip
                  title="Opens in a new tab"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
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
            </a>
            .
          </p>
          <p>
            If you have an idea for a new lesson,{" "}
            <a href="mailto:typeytype@didoesdigital.com">
              email typeytype@didoesdigital.com
            </a>{" "}
            or{" "}
            <OutboundLink
              eventLabel="tweet @DiDoesDigital"
              aria-label="tweet @DiDoesDigital (external link opens in new tab)"
              to="https://twitter.com/didoesdigital"
            >
              <span className="whitespace-nowrap">
                tweet @DiDoesDigital
                {/* @ts-ignore */}
                <Tooltip
                  title="Opens in a new tab"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
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
            . You can also find Di on Discord.
          </p>

          <h3 id="dictionaries">Dictionaries</h3>
          <p>
            To help the open steno community and Typey&nbsp;Type grow even
            faster, add your custom dictionaries to the{" "}
            <OutboundLink
              eventLabel="community’s dictionaries"
              aria-label="community’s dictionaries (external link opens in new tab)"
              to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
            >
              community’s&nbsp;dictionaries
              {/* @ts-ignore */}
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
            If you notice anything unexpected,{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690="
              target="_blank"
              rel="noopener noreferrer"
              id="ga--contribute--give-feedback-on-dictionary"
            >
              share your feedback on that dictionary
              {/* @ts-ignore */}
              <Tooltip
                title="Opens in a new tab"
                className=""
                animation="shift"
                arrow="true"
                duration="200"
                tabIndex="0"
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
            .
          </p>
          <p>
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
                  tabIndex="0"
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
            </OutboundLink>{" "}
            has many dictionaries. These power Typey&nbsp;Type’s stroke
            suggestions. See the{" "}
            <OutboundLink
              eventLabel="repo’s contributing section"
              aria-label="repo’s contributing section (external link opens in new tab)"
              to="https://github.com/didoesdigital/steno-dictionaries#contributing"
            >
              repo’s contributing section
              {/* @ts-ignore */}
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

          <h3 id="feedback">Feedback</h3>
          <p>
            <OutboundLink
              eventLabel="Typey Type for Stenographers feedback form"
              aria-label="Share your feedback (form opens in new tab)"
              to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
            >
              Share your feedback
              {/* @ts-ignore */}
              <Tooltip
                title="Form opens in a new tab"
                animation="shift"
                arrow="true"
                className=""
                duration="200"
                tabIndex="0"
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
      </div>
    </main>
  );
};

export default Contribute;
