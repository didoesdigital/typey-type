import React, { useEffect, useRef } from "react";
import OutboundLink from "../../components/OutboundLink";
import { Link } from "react-router-dom";
import Subheader from "../../components/Subheader";

const Contribute = () => {
  const mainHeading = useRef<HTMLHeadingElement>(null);

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
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://www.patreon.com/didoesdigital"
            >
              Patreon (opens in new tab)
            </OutboundLink>
            . A monthly donation helps me build more lessons and features to
            help you fast-track your steno&nbsp;progress.
          </p>

          <h3 id="lessons">Lessons</h3>
          <p>
            You can create your own{" "}
            <Link to="/lessons/custom">custom lesson</Link> and add it to the{" "}
            <OutboundLink
              eventLabel="community’s lessons (opens in new tab)"
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
            >
              community’s lessons (opens in new tab)
            </OutboundLink>
            .
          </p>
          <p>
            If you have an idea for a new lesson,{" "}
            <a href="mailto:typeytype@didoesdigital.com">
              email typeytype@didoesdigital.com
            </a>
            . You can also find Di on Discord.
          </p>

          <h3 id="dictionaries">Dictionaries</h3>
          <p>
            To help the open steno community and Typey&nbsp;Type grow even
            faster, add your custom dictionaries to the{" "}
            <OutboundLink
              eventLabel="community’s dictionaries"
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
            >
              community’s&nbsp;dictionaries (opens in new tab)
            </OutboundLink>
            .
          </p>
          <p>
            If you notice anything unexpected,{" "}
            <OutboundLink
              eventLabel="share your feedback on that dictionary (opens in new tab)"
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690="
            >
              share your feedback on that dictionary (opens in new tab)
            </OutboundLink>
            .
          </p>
          <p>
            <OutboundLink
              eventLabel="Di’s Steno Dictionaries repo"
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://github.com/didoesdigital/steno-dictionaries"
            >
              Di’s Steno Dictionaries repo (opens in new tab)
            </OutboundLink>{" "}
            has many dictionaries. These power Typey&nbsp;Type’s stroke
            suggestions. See the{" "}
            <OutboundLink
              eventLabel="repo’s contributing section"
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://github.com/didoesdigital/steno-dictionaries#contributing"
            >
              repo’s contributing section (opens in new tab)
            </OutboundLink>
            .
          </p>

          <h3 id="feedback">Feedback</h3>
          <p>
            <OutboundLink
              eventLabel="Typey Type for Stenographers feedback form"
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
            >
              Share your feedback (opens in new tab)
            </OutboundLink>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default Contribute;
