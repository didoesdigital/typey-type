import React from "react";

type Props = {
  containerId: string;
  hideHelp: boolean;
};

type RuleHeadingProps = {
  children: React.ReactNode;
};
const RuleHeading = ({ children }: RuleHeadingProps) => (
  <h4 className="mb0 mt0 pt2 pb1 px3 h5 fw7">{children}</h4>
);

type RuleBlurbProps = {
  children: React.ReactNode;
};
const RuleBlurb = ({ children }: RuleBlurbProps) => (
  <div className="mb0 pt0 pb1 px3">{children}</div>
);

const GeneratorHelp = ({ hideHelp, containerId }: Props) => (
  <div
    id={containerId}
    className={`mh-page mw-744 bg-slat dark:bg-coolgrey-1100 bl b--brand-primary-tint--60 dark:border-coolgrey-800 ${
      hideHelp ? " hide" : ""
    }`}
    style={{ flexGrow: 100 }}
    aria-hidden={hideHelp}
  >
    <div className="mw100">
      <h3 className="mb1 pl3 mt3 pt3">Help</h3>

      <p className="mb0 pt2 pb1 pl3">
        Here are some extra details about the options on this page.
      </p>

      <p className="mb0 pt2 pb1 pl3">
        Some rules don’t make sense to apply at the same time, such as “is one
        syllable” and “has more than one syllable”, and will result in no words.
      </p>
      <RuleHeading>“is one syllable”</RuleHeading>
      <RuleBlurb>
        <p>
          This rule guesses the syllable count and only includes words that are
          1 syllable long. Anything with a space and some particular terms like
          “mysql” are automatically considered more than one syllable.
        </p>
        <p className="mb0">
          E.g. includes “one”, “course”, “through”, “branch”.
        </p>
        <p>E.g. excludes “city”, “desire”, “something”, “is it”.</p>
      </RuleBlurb>
      <RuleHeading>“has more than one syllable”</RuleHeading>
      <RuleBlurb>
        <p>
          This rule guesses the syllable count and only includes words that are
          more than 1 syllable long. Some particular terms like “genre” are
          automatically considered more than one syllable.
        </p>
      </RuleBlurb>
    </div>
  </div>
);

export default GeneratorHelp;
