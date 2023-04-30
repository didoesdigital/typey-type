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
  <div className="mb0 pt0 pb1 px3 bb b--brand-primary-tint">{children}</div>
);

type StrokeProps = {
  children: React.ReactNode;
};
const Stroke = ({ children }: StrokeProps) => (
  <span className="steno-stroke steno-stroke--subtle px05">{children}</span>
);

const GeneratorHelp = ({ hideHelp, containerId }: Props) => (
  <div
    id={containerId}
    className={`mh-page mw-744 overflow-y-scroll bg-slat dark:bg-coolgrey-1100 bl b--brand-primary-tint--60 dark:border-coolgrey-800 ${
      hideHelp ? " hide" : ""
    }`}
    style={{ flexGrow: 100, maxHeight: "2632px" }}
    aria-hidden={hideHelp}
  >
    <div className="mw100 type-face--sans-serif">
      <h3 className="mb1 px3 mt3 pt3">Lesson generator help</h3>

      <p className="mb0 pt2 pb1 px3">To use the lesson generator:</p>
      <div className="mb0 pt2 px3">
        <ol>
          <li>Select some rules</li>
          <li>Press “Build lesson”</li>
          <li>Press “Start generated lesson”</li>
        </ol>
      </div>

      <p className="mb0 pt2 pb1 px3">Here are some details about the rules:</p>

      <div className="mb0 pt2 px3">
        <ul>
          <li>
            Setting a rule to “On” will build a lesson only containing entries
            that meet that rule.
          </li>
          <li>
            Setting a rule to “Off” will build a lesson only containing entries
            that do NOT meet that rule.
          </li>
          <li>
            Setting a rule to “Ignored” will include both words that do meet the
            rule and words that do NOT meet the rule; the rule is ignored.
          </li>
        </ul>
      </div>

      <p className="mb0 pt1 pb1 px3 bb b--brand-primary-tint">
        Some rules don’t make sense to turn on at the same time, such as “is one
        syllable” and “has more than one syllable”, and will result in no words.
      </p>

      <RuleHeading>“is one syllable”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule guesses the syllable count and only includes words that are
          1 syllable long. Anything with a space and some particular terms like
          “mysql” are automatically considered more than one syllable.
        </p>
        <p className="mb0">
          E.g. includes “one”, “course”, “through”, “branch”.
        </p>
        <p className="mb0">
          E.g. excludes “city”, “desire”, “something”, “is it”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has more than one syllable”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule guesses the syllable count and only includes words that are
          more than 1 syllable long. Some particular terms like “genre” are
          automatically considered more than one syllable.
        </p>
      </RuleBlurb>

      <RuleHeading>“is a brief”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for skeleton briefs (no vowel keys), single vowel key
          briefs, and left-side or right-side only briefs. It also looks for
          specific extras like <Stroke>SURG</Stroke> for “surgeon”.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>P-B</Stroke> for “peanut butter”,{" "}
          <Stroke>SEPS</Stroke> for “accepts”, and <Stroke>OEB</Stroke> for
          “observe”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has star key”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for <Stroke>*</Stroke>.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>PWO*T</Stroke> for “both”. E.g. excludes{" "}
          <Stroke>PWOT</Stroke> for “bot”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has one space”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for dictionary translations with exactly 1 space.
        </p>
        <p className="mb0">E.g. includes “is it”.</p>
        <p className="mb0">E.g. excludes “in real life” and “world”.</p>
      </RuleBlurb>

      <RuleHeading>“has one or more spaces”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for dictionary translations with 1 or more spaces.
        </p>
        <p className="mb0">E.g. includes “is it” and “in real life”.</p>
        <p className="mb0">E.g. excludes “world” and “%”.</p>
      </RuleBlurb>

      <RuleHeading>“has numbers”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for dictionary translations with any digits.
        </p>
        <p className="mb0">
          E.g. includes “7-zip” and “100 Years of Solitude”.
        </p>
        <p className="mb0">E.g. excludes “factor VII”, “seven”, and “%”.</p>
      </RuleBlurb>

      <RuleHeading>“is a Roman numeral”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for Roman numerals from I to XII (1 to 12) using the{" "}
          <Stroke>R</Stroke> key.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>1-R</Stroke> for “I”.
        </p>
        <p className="mb0">
          E.g. excludes “1” and <Stroke>EU</Stroke> for “I”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has apostrophes”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">This rule looks for “'”.</p>
        <p className="mb0">E.g. includes “I'll”.</p>
        <p className="mb0">E.g. excludes “ill”.</p>
      </RuleBlurb>

      <RuleHeading>“has punctuation”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for any punctuation and symbols, including emoji.
        </p>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <p className="mb0">
          E.g. includes “I'll”, “£”, “©”, “💯”, and{" "}
          <code>&#123;&amp;%&#125;</code>.
        </p>
        <p className="mb0">E.g. excludes “ill”, “is it”, and “1”.</p>
      </RuleBlurb>

      <RuleHeading>“has a capital letter”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">This rule looks for any capital letter.</p>
        <p className="mb0">E.g. includes “A”, “iPhone”, and “HTML”.</p>
        <p className="mb0">E.g. excludes “a”, “phone”, and “.html”.</p>
      </RuleBlurb>

      <RuleHeading>“is entirely uppercase”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for dictionary translations entirely made of uppercase
          letters.
        </p>
        <p className="mb0">E.g. includes “A”, “ASCII”, and “HTML”.</p>
        <p className="mb0">E.g. excludes “a”, “iPhone”, and “Harry”.</p>
      </RuleBlurb>

      <RuleHeading>“has simple steno keys”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for beginner-friendly steno keys, such as those that
          only need one 1 finger to press, plus star key and number bar. It
          includes multi-stroke entries.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>KAB</Stroke> for “cab”.
        </p>
        <p className="mb0">
          E.g. excludes <Stroke>TKAB</Stroke> for “dab”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has one key per finger”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines that contain no two-key combinations that
          must be pressed with a single finger. It also excludes multi-stroke
          entries.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>TEFT</Stroke> and <Stroke>SKES</Stroke>.
        </p>
        <p className="mb0">
          E.g. excludes outlines with <Stroke>TS</Stroke>, <Stroke>TD</Stroke>,
          or <Stroke>*F</Stroke>.
        </p>
      </RuleBlurb>

      <RuleHeading>“has any vowel key”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for any vowel key: <Stroke>A</Stroke>,{" "}
          <Stroke>O</Stroke>, <Stroke>E</Stroke>, or <Stroke>U</Stroke>.
        </p>
      </RuleBlurb>

      <RuleHeading>“has any long vowel”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines with any combinations of keys used for
          long vowels (as opposed to short vowels).
        </p>
        <p className="mb0">
          E.g. includes <Stroke>AOEU</Stroke> for “eye”, <Stroke>AEU</Stroke>{" "}
          for “a”, and <Stroke>OE</Stroke> for “owe”.
        </p>
        <p className="mb0">
          E.g. excludes <Stroke>EU</Stroke> for “I”, <Stroke>A</Stroke> for the
          prefix “a”, and <Stroke>SEUTS</Stroke> for “sits”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has any short vowel”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines with any short vowel key combinations.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>EU</Stroke> for “I” and <Stroke>SAT</Stroke>{" "}
          “sat”.
        </p>
        <p className="mb0">
          E.g. excludes <Stroke>AOEU</Stroke> for “eye” and{" "}
          <Stroke>SAOEUT</Stroke> for “sight”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has only short I vowel”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines containing <Stroke>EU</Stroke> and no
          other vowels. It also excludes <Stroke>STREUF</Stroke> for “strive”,
          which is using the short “i” keys only to avoid conflict with
          “strife”.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>SEUBGS</Stroke> for “six”.
        </p>
        <p className="mb0">
          E.g. excludes <Stroke>RUPB</Stroke> for “run”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has only one vowel key”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for <Stroke>A</Stroke>, <Stroke>O</Stroke>,{" "}
          <Stroke>E</Stroke>, or <Stroke>U</Stroke> without other surrounding
          vowel keys.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>THAT</Stroke> for “that”.
        </p>
        <p className="mb0">
          E.g. excludes <Stroke>SRAOU</Stroke> for “view”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has unstressed vowels”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for entries with dropped unstressed vowels.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>TEPD</Stroke> for “tepid”.
        </p>
        <p className="mb0">
          E.g. excludes <Stroke>TEFT</Stroke> for “test”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has double vowels”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">This rule looks for exactly two vowels in a row.</p>
        <p className="mb0">E.g. includes “look”.</p>
        <p className="mb0">E.g. excludes “yaaaaaaay”.</p>
      </RuleBlurb>

      <RuleHeading>“has double letters”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for any duplicate letters, but not triple letters.
        </p>
        <p className="mb0">E.g. includes “letter”.</p>
        <p className="mb0">E.g. excludes “III”.</p>
      </RuleBlurb>

      <RuleHeading>“has double consonants”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for exactly two consonants” in a row.
        </p>
        <p className="mb0">E.g. includes “Harry”.</p>
        <p className="mb0">E.g. excludes “best”.</p>
      </RuleBlurb>

      <RuleHeading>“has some consonants”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines containing two or more consonant keys.
        </p>
        <p className="mb0">E.g. includes “world”.</p>
        <p className="mb0">E.g. excludes “cat”.</p>
      </RuleBlurb>

      <RuleHeading>“has one consonant on each side”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for one consonant from the left side of the steno
          board and one consonant from the right.
        </p>
        <p className="mb0">E.g. includes “sap”.</p>
        <p className="mb0">E.g. excludes “art”.</p>
      </RuleBlurb>

      <RuleHeading>“has left-side, multi-key consonant”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for multi-key consonants on the left-hand side of the
          board.
        </p>
      </RuleBlurb>

      <RuleHeading>“has right-side, multi-key consonant”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for multi-key consonants on the right-hand side of the
          board.
        </p>
      </RuleBlurb>

      <RuleHeading>“has a diphthong like AU, OU, or OEU”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines containing a diphthong:{" "}
          <Stroke>AU</Stroke>, <Stroke>OU</Stroke>, or <Stroke>OEU</Stroke>.
        </p>
      </RuleBlurb>

      <RuleHeading>“has a vowel disambiguator like AE or AO”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines containing <Stroke>AE</Stroke> or{" "}
          <Stroke>AO</Stroke> without other surrounding vowel keys.
        </p>
      </RuleBlurb>

      <RuleHeading>“has digraphs like “ch” or “ng””</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for entries with a matching digraph outline and
          translation like <Stroke>KH</Stroke> and “ch”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has compound clusters like BGS”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for compound clusters outlines with matching
          translations like <Stroke>BGS</Stroke> and “ction”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has contractions or possessives”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for apostrophes in lower case words or with the word
          “I”.
        </p>
        <p className="mb0">E.g. includes “aren't” and “I'll”.</p>
        <p className="mb0">E.g. excludes “L'Oreal”.</p>
      </RuleBlurb>

      <RuleHeading>“has inversion”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for entries with matching outlines and words with
          sounds out of steno order, such as <Stroke>FL</Stroke> and “lf” or
          “lv”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has “F” as “V” or “S””</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for <Stroke>F</Stroke> to write a word with a vowel
          (or “y”) and a “s” or “v”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has short translations”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for dictionary translations shorter than 6 characters.
          Note, it can have surprising results with emoji.
        </p>
      </RuleBlurb>

      <RuleHeading>“has long translations”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for dictionary translations longer than 16 characters,
          which may include spaces or hyphenated compound words. Note, it can
          have surprising results with emoji.
        </p>
      </RuleBlurb>

      <RuleHeading>“has long words (no spaces or dashes)”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for whole words longer than 10 characters. It excludes
          translations with hyphens or spaces.
        </p>
        <p className="mb0">E.g. includes “immeasurable” and “distributes”.</p>
        <p className="mb0">
          E.g. excludes “alarm clock”, “United Nations”, “in real life” and
          “eastbound traffic”.
        </p>
      </RuleBlurb>

      <RuleHeading>“starts with a prefix”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines starting with a prefix stroke with a
          matching translation starting with the same prefix’s text.
        </p>
      </RuleBlurb>

      <RuleHeading>“ends with a suffix”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for outlines ending with a suffix stroke with a
          matching translation ending with the same suffix’s text.
        </p>
      </RuleBlurb>

      <RuleHeading>“is superlative (other than “er” endings)”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for probable superlatives ending with “ier” or “est”,
          or starting with “most ” or “least ” and ending in “ly”. Ideally it
          would include words ending with “er” but they are hard to distinguish
          from other words like “fear”.
        </p>
        <p className="mb0">
          E.g. includes “simpler”, “happiest”, and “most loyal”.
        </p>
      </RuleBlurb>

      <RuleHeading>“outline is the same as translation”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for entries where the outline uses the same letters as
          the translation.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>THAT</Stroke> for “that” and{" "}
          <Stroke>WAS</Stroke> for “was”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has stretch keys D or Z”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for <Stroke>D</Stroke> or <Stroke>Z</Stroke>.
        </p>
      </RuleBlurb>

      <RuleHeading>“is fingerspelled”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for entries where every stroke is a fingerspelling
          outline.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>*E/KP*/T*/O*/R*/T*</Stroke>.
        </p>
        <p className="mb0">
          E.g. excludes <Stroke>HAPBD/SO*PL/TK-LS/S*/T*</Stroke>.
        </p>
      </RuleBlurb>

      <RuleHeading>“has disambiguating brief like HEURD”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule checks for specific outlines that do not match the
          translation phonetically and are instead adjusted to avoid a conflict
          with a similar entry.
        </p>
        <p className="mb0">
          E.g. includes <Stroke>WEUFS</Stroke> for “wives” and{" "}
          <Stroke>STREUF</Stroke> for “strive”.
        </p>
        <p className="mb0">
          E.g. excludes <Stroke>HAOEURD</Stroke> for “hydro^” and{" "}
          <Stroke>STRAOEUF</Stroke> for “strife”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has suppressed space stroke, TK-LS”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule checks for <Stroke>TK-LS</Stroke>.
        </p>
      </RuleBlurb>

      <RuleHeading>“has Philly shift like TDZ”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for <Stroke>TDZ</Stroke>, <Stroke>TSD</Stroke>,{" "}
          <Stroke>TSZ</Stroke>, or <Stroke>SDZ</Stroke>.
        </p>
      </RuleBlurb>

      <RuleHeading>“has coding terms”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule checks a list of coding terms like “TypeScript”, “def”,
          “rm”, and “http://”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has medical terms”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule checks a list of medical terms like “carpal tunnel”, “ACE
          inhibitor”, “red blood cell”, or “cardinal veins”.
        </p>
      </RuleBlurb>

      <RuleHeading>“has /SP-S forced word ending”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for <Stroke>SP-S</Stroke> strokes.
        </p>
      </RuleBlurb>

      <RuleHeading>“has dictionary formatting”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for dictionary formatting text in outlines used by the
          Plover steno engine to transform results, such as{" "}
          <code>&#123;PLOVER:TOGGLE&#125;</code> or{" "}
          <code>&#123;MODE:SNAKE&#125;</code>.
        </p>
      </RuleBlurb>

      <RuleHeading>“has outline matching”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for entries where the outline or strokes match the
          regular expression provided. This{" "}
          <a
            href="https://www.sitepoint.com/learn-regex/"
            target="_blank"
            rel="noopener noreferrer"
          >
            external link to learn more regular expressions opens in a new tab
          </a>
          .
        </p>
      </RuleBlurb>

      <RuleHeading>“has translation matching”</RuleHeading>
      <RuleBlurb>
        <p className="mb0">
          This rule looks for entries where the translation or words match the
          regular expression provided. This{" "}
          <a
            href="https://www.sitepoint.com/learn-regex/"
            target="_blank"
            rel="noopener noreferrer"
          >
            external link to learn more regular expressions opens in a new tab
          </a>
          .
        </p>
      </RuleBlurb>
    </div>
  </div>
);

export default GeneratorHelp;
