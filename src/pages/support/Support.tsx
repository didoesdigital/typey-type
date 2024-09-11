import React, { useEffect, useRef } from "react";
import OutboundLink from "../../components/OutboundLink";
import { Link } from "react-router-dom";
import DescriptionList from "../../components/DescriptionList";
import DescriptionTerm from "../../components/DescriptionTerm";
import DescriptionDetails from "../../components/DescriptionDetails";
import Subheader from "../../components/Subheader";

function hashToQuery(hash: string) {
  if (hash.includes(":~:text")) {
    const trimmedHashText = hash.replace(":~:text=", "");
    if (trimmedHashText.includes(encodeURIComponent("How long"))) {
      return "#time-to-learn";
    }
  }

  return hash;
}

const dictionaryEntryForTabSpace = '"STA*PB": "{#Tab}{#space}",';
const dictionaryEntryForWinNextLessonAccessKey =
  '"HR*FPB": "{#alt(shift(o))}",';
const dictionaryEntryForMacNextLessonAccessKey =
  '"HR*FPB": "{#control(option(o))}",';
const dictionaryEntryForWinRestartAccessKey = '"STA*RT": "{#alt(shift(s))}",';
const dictionaryEntryForMacRestartAccessKey =
  '"STA*RT": "{#control(option(s))}",';
const dictionaryEntryForWinReviseAccessKey = '"SRAO*EUZ": "{#alt(shift(r))}",';
const dictionaryEntryForMacReviseAccessKey =
  '"SRAO*EUZ": "{#control(option(r))}",';

const Support = () => {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 0) {
        try {
          const el = document.querySelector<HTMLAnchorElement>(
            hashToQuery(hash)
          );
          let top = 0;
          if (el && el.getBoundingClientRect().top) {
            top = el.getBoundingClientRect().top;
          }
          const scrollOptions: ScrollToOptions = {
            left: 0,
            top: window.scrollY + top,
            behavior: "smooth",
          };
          if (el) {
            window.scrollTo(scrollOptions);
            window.setTimeout(function () {
              el?.focus();
            }, 1000);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    scrollToAnchor();

    window.onhashchange = scrollToAnchor;

    if (mainHeading.current && !window.location.hash) {
      mainHeading.current?.focus();
    }
  }, []);

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2
              ref={mainHeading}
              tabIndex={-1}
              id="about-typey-type-for-stenographers"
            >
              About Typey&nbsp;Type for Stenographers
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024 type-face--sans-serif">
        <div className="mw-568">
          <p className="mt3">
            Typey&nbsp;Type is a typing app designed to help{" "}
            <a href="#about-stenography">stenography</a> (steno) students learn
            steno faster. You can learn briefs and improve your stenographic
            speed and accuracy. Lessons evolve as you progress. They have tight
            feedback loops so you learn to fix misstrokes immediately. You can
            effortlessly track progress in your brief vocabulary and rapidly
            increase in steno skill.
          </p>

          <h3 id="about-stenography">Stenography</h3>
          <p>
            The process of writing shorthand is called{" "}
            <strong>stenography</strong>. Using a stenotype machine (or a fancy
            keyboard) and special software, you can type over 100 or even 200
            words per minute. You press keys together on a stenotype machine
            like playing a piano chord. The software translates the combination
            into meaningful words according to their phonetic sounds. Plover is
            the world’s first free, open-source stenography program. You can
            learn more about Plover from the{" "}
            <OutboundLink
              eventLabel="Open steno project"
              to="http://openstenoproject.org/"
            >
              Open steno project
            </OutboundLink>
            .
          </p>

          <h3 id="about-the-creator">About the creator, Di</h3>
          <p>
            Hi! I’m <a href="https://didoesdigital.com/">Di</a>. I created
            Typey&nbsp;Type to help myself learn and practice stenography as an
            ergonomic alternative for typing. I had sore wrists from the painful
            contortions of keyboard shortcuts on a qwerty keyboard. Back in
            2017, there weren't a lot of options for steno students to
            interactively practice new words. So using my design and development
            skills, I built Typey&nbsp;Type. I designed it to work on the web so
            that it would be easy for people to access and start using straight
            away without installing anything.
          </p>
          <p>
            Since then it's been a labour of love. Inspired by the people that
            use Typey&nbsp;Type and share their stories, I continue to make
            changes and improvements to help students on their steno journeys.
          </p>
          <p>
            If you want to help fund my efforts on this project, you can{" "}
            <OutboundLink
              eventLabel="Patreon"
              to="https://www.patreon.com/didoesdigital"
            >
              become a supporter on Patreon.
            </OutboundLink>
          </p>

          <h3 id="steno-terms">Steno terms</h3>
          <DescriptionList>
            <DescriptionTerm>Briefs</DescriptionTerm>
            <DescriptionDetails>
              Loosely, a brief or outline is the specified combination of keys
              pressed together to produce a specific word or phrase. Strictly, a
              brief or abbreviation is a shortened outline form with fewer
              strokes than the phonetic outline.
            </DescriptionDetails>
            <DescriptionTerm>Strokes</DescriptionTerm>
            <DescriptionDetails>
              A stroke is a combination of keys held together and released to
              write a word or sound. A multi-stroke brief is a combination of
              strokes pressed to produce a word or phrase (usually of more
              syllables).
            </DescriptionDetails>
            <DescriptionTerm>Misstrokes</DescriptionTerm>
            <DescriptionDetails>
              Misstrokes are extra entries that use similar keys to produce the
              word you meant to write. If you regularly mistype a word, you
              might add a misstroke entry for the keys you are incorrectly
              pressing so that your dictionaries effectively autocorrects your
              mistakes. For example, the misstroke{" "}
              <span className="steno-stroke">SPHAOEU</span> to write “supply” is
              missing the left-hand <span className="steno-stroke">R</span> key
              from the usual outline{" "}
              <span className="steno-stroke">SPHRAOEU</span>.
            </DescriptionDetails>
            <DescriptionTerm>Plover</DescriptionTerm>
            <DescriptionDetails>
              {" "}
              <OutboundLink
                eventLabel="Plover"
                to="http://www.openstenoproject.org/plover/"
              >
                Plover
              </OutboundLink>{" "}
              is the world’s first free, open-source stenography program. It
              works cross-platform on Windows, macOS, and Linux operating
              systems.
            </DescriptionDetails>
          </DescriptionList>

          <h3 id="typey-type-notes">Typey&nbsp;Type notes</h3>
          <p>
            Typey&nbsp;Type embraces ideas of spaced repetitions and deliberate
            practice to teach steno effectively:
          </p>
          <ul>
            <li>
              <OutboundLink
                eventLabel="spaced repetitions"
                to="https://en.wikipedia.org/wiki/Spaced_repetition"
              >
                Spaced repetitions
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                eventLabel="deliberate practice"
                to="https://en.wikipedia.org/wiki/Practice_(learning_method)#Deliberate_practice"
              >
                Deliberate practice
              </OutboundLink>
            </li>
          </ul>

          <h4 id="typey-type-progress-tracking">
            Typey Type progress tracking
          </h4>
          <p>
            When you “stop” a lesson before reaching the end or you complete a
            lesson, Typey&nbsp;Type will save{" "}
            <Link to="/progress">your progress</Link>. That’s when it saves all
            the new words you’ve successfully typed. If you leave a lesson
            without stopping it or finishing it, you’ll lose that lesson’s
            progress. Typey&nbsp;Type saves your brief progress in your
            browser’s local storage. You’ll lose your progress if you clear your
            browsing data (history, cookies, and cache). If you share this
            device with other people or use Typey&nbsp;Type across several
            devices and browsers, you should save your progress elsewhere. Copy
            your progress to your clipboard and save it in a text file somewhere
            safe. When you return, enter your progress to load it back into
            Typey&nbsp;Type.
          </p>

          <h4 id="typey-type-dictionary">Typey&nbsp;Type dictionary</h4>
          <p>
            Typey&nbsp;Type uses a version of the Plover dictionary that comes
            built into the Plover software. Typey&nbsp;Type’s version is based
            on a copy of Plover’s from a few years ago. I have since spent many
            hours meticulously amending it. This helps Typey&nbsp;Type suggests
            the best brief available. It chooses the “best” stroke by looking
            for the shortest stroke, where there are penalties for multi-stroke
            briefs and briefs that use the star (<code>*</code>) key. I have
            also removed thousands of misstrokes to hide them when learning
            Plover theory. There are some manual adjustments too. These show
            strokes that are more consistent with similar words, more consistent
            with Plover’s theory, phonetic, or easier to stroke.
          </p>
          <p>
            <Link to="/lessons/custom">Typey&nbsp;Type custom lessons</Link> let
            you use your own briefs or steno theory.
          </p>
          <p>
            If you notice any odd strokes,{" "}
            <OutboundLink
              eventLabel="post to the feedback form"
              to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
            >
              post to the feedback form
            </OutboundLink>
            .
          </p>

          <h4 id="typey-type-hints">Typey&nbsp;Type hints</h4>
          <p>
            To manually show a stroke hint in a lesson that otherwise hides
            hints, press <kbd>Tab</kbd> to focus on the stroke hint and{" "}
            <kbd>Space</kbd> activate it. This will automatically move your
            focus back to typing. To avoid losing time doing this, you can
            create a brief to press <kbd>Tab</kbd> and <kbd>Space</kbd> for you,
            such as{" "}
            <code className="tag-missing-full-stop">
              {dictionaryEntryForTabSpace}
            </code>
          </p>

          <h4 id="typey-type-shortcuts">Typey&nbsp;Type shortcuts</h4>
          <p>
            There are some keyboard shortcuts available when you finish a lesson
            that make use of the browser’s built in{" "}
            <OutboundLink
              eventLabel="accesskey"
              to="https://en.m.wikipedia.org/wiki/Access_key"
            >
              accesskey functionality
            </OutboundLink>
            .
          </p>
          <p>
            To jump to the <strong className="fw7">next lesson</strong>, use the{" "}
            <code>accesskey</code> shortcut plus the <kbd>o</kbd> key. You can
            create a steno brief for the shortcut like this:
          </p>
          <ul>
            <li>
              For macOS: <code>{dictionaryEntryForMacNextLessonAccessKey}</code>
            </li>
            <li>
              For everything else:{" "}
              <code>{dictionaryEntryForWinNextLessonAccessKey}</code>
            </li>
          </ul>
          <p>
            To <strong className="fw7">restart a lesson</strong>, use the{" "}
            <code>accesskey</code> shortcut plus the <kbd>s</kbd> key. You can
            create a steno brief for the shortcut like this:
          </p>
          <ul>
            <li>
              For macOS: <code>{dictionaryEntryForMacRestartAccessKey}</code>
            </li>
            <li>
              For everything else:{" "}
              <code>{dictionaryEntryForWinRestartAccessKey}</code>
            </li>
          </ul>
          <p>
            To <strong className="fw7">revise selected words</strong>, use the{" "}
            <code>accesskey</code> shortcut plus the <kbd>r</kbd> key. You can
            create a steno brief for the shortcut like this:
          </p>
          <ul>
            <li>
              For macOS: <code>{dictionaryEntryForMacReviseAccessKey}</code>
            </li>
            <li>
              For everything else:{" "}
              <code>{dictionaryEntryForWinReviseAccessKey}</code>
            </li>
          </ul>
          <p>
            To activate accesskey shortcuts, use the browser{" "}
            <code>accesskey</code> shortcut plus the specific shortcut key,
            which is usually a letter, such as <kbd>s</kbd>. The{" "}
            <code>accesskey</code> shortcut for most browsers is:
          </p>
          <ul>
            <li>
              <kbd>Ctrl</kbd>+<kbd>Option</kbd> on a Mac,
            </li>
            <li>
              <kbd>Alt</kbd>+<kbd>Shift</kbd> on Windows and other operating
              systems.
            </li>
          </ul>

          <h4 id="typey-type-terms">Typey&nbsp;Type terms</h4>
          <DescriptionList>
            <DescriptionTerm>Spacing</DescriptionTerm>
            <DescriptionDetails>
              Typey&nbsp;Type lets you choose where spaces should appear in a
              phrase for checking if you typed it correctly. Steno software can
              insert spaces before or after words, depending on the specific
              software and its settings. For example, Plover inserts spaces
              before words by default, and has a setting to insert spaces after
              words. Plover also provides extra spacing and capitalisation modes
              that can be set on the fly. This might suppress spaces or insert
              other punctuation (like dashes). A QWERTYist may feel more
              comfortable drilling words without any spaces, or sentences with
              spaces as the end.
            </DescriptionDetails>
            <DescriptionTerm>Seen words</DescriptionTerm>
            <DescriptionDetails>
              Typey&nbsp;Type tracks words you’ve "seen" or "met". Each time you
              successfully type a new word, that’s logged as a successful
              meeting.
            </DescriptionDetails>
            <DescriptionTerm>Words per minute (WPM)</DescriptionTerm>
            <DescriptionDetails>
              To track your typing speed, Typey&nbsp;Type displays the number of
              words you’ve typed per minute using the unit “words per minute
              (WPM)”. A word is considered to be 5 letters long on average. This
              means you might type many short words and have a higher WPM score.
            </DescriptionDetails>
            <DescriptionTerm>Discover</DescriptionTerm>
            <DescriptionDetails>
              The first type of study session lets you discover new briefs by
              showing only a limited number of new words while revealing their
              strokes. Write these words slowly, concentrating on accuracy and
              forming good habits around how you stroke word parts. Focus on
              lessons with interesting words, especially top words for your
              needs, such as common English words for general usage. You might
              also study domain specific phrases for particular industries.
            </DescriptionDetails>
            <DescriptionTerm>Revise</DescriptionTerm>
            <DescriptionDetails>
              The next type of study session helps you revise recently learned
              briefs by showing only words you’ve seen. Apply effort to recall
              these briefs before showing strokes. Avoid fingerspelling or
              stroking out long, phonetic forms of words so you can memorise and
              rehearse the best brief for every word. Choose a lesson with the
              majority of words you’re interested in nailing first like the top
              1000 words.
            </DescriptionDetails>
            <DescriptionTerm>Drill</DescriptionTerm>
            <DescriptionDetails>
              The third type of study session is about building up your muscle
              memory and testing your skills. Write as fast and furiously as you
              can and aim for a high WPM score. Pick specific drills that focus
              on a certain kind of brief or many similar words so you can
              associate them together.
            </DescriptionDetails>
            <DescriptionTerm>Practice</DescriptionTerm>
            <DescriptionDetails>
              The final type of study session lets you mimic real usage as
              closely as possible. Write as fast as you can without causing
              misstrokes. Explore stories that use real sentences.
            </DescriptionDetails>
          </DescriptionList>

          <h4 id="flashcards" tabIndex={-1}>
            Flashcards
          </h4>
          <p>
            Flashcards are designed for mobile devices so you can memorise steno
            briefs on the go. When you’re unable to recall a brief, tap “Hard”
            to say it was hard to remember. When you can recall a brief without
            hesitation, tap “Easy”. While studying flashcards, imagine which
            fingers and the shape of the outline you’d use to stroke a word.
          </p>
          <p>
            If it’s been a while since you’ve studied, the “threshold” will be
            set quite high. You’ll see flashcards you’ve studied that are below
            the threshold. That is, if the threshold is 12, you’ll see
            flashcards for words you’ve marked “Easy” less than 12 times. If
            you’ve marked a word as “Easy” 15 times, it won’t shown again until
            more time has passed.
          </p>
          <p>
            Thanks to Jim Ladd, you can also use the Anki app to memorise
            briefs. He built flashcard decks for the Top 2000 Words from Project
            Gutenberg using Typey&nbsp;Type steno diagrams:
          </p>
          <ul>
            <li>
              <OutboundLink eventLabel="Anki" to="https://apps.ankiweb.net/">
                Anki
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                eventLabel="flashcard decks for the Top 2000 Words"
                to="https://github.com/jladdjr/anki-decks/tree/master/Plover%20-%20Project%20Gutenberg%20Top%2010k%20Words"
              >
                Flashcard decks for the Top 2000 Words
              </OutboundLink>
            </li>
          </ul>

          <h4 id="offline" tabIndex={-1}>
            Offline
          </h4>
          <p>
            Typey&nbsp;Type does not yet officially support offline use through
            the website. Until then, it’s technically possible to make it work
            offline by running the code yourself. You can follow the steps from
            the{" "}
            <OutboundLink
              eventLabel="Typey Type repo README"
              to="https://github.com/didoesdigital/typey-type/blob/master/README.md"
            >
              Typey&nbsp;Type repo README
            </OutboundLink>
            .
          </p>

          <h3 id="learn-steno">Learning stenography</h3>
          <h4 id="try-steno">How can you try out steno?</h4>
          <p>
            For an idea of how steno feels and works, you can{" "}
            <OutboundLink
              eventLabel="install Plover"
              to="http://openstenoproject.org/"
            >
              install Plover
            </OutboundLink>{" "}
            and use its “arpeggiate” setting. This setting lets you use a QWERTY
            keyboard to write stenography. The trick is that you press each key
            separately and then press space bar to send the stroke. Usually a
            stenographer will press all keys together and release them together.
            Most QWERTY keyboards, however, are non-NKRO (N-key roll over),
            meaning only the first 6 keys held together will be noticed; later
            keys are ignored. Arpeggiate will let you explore steno, but is
            unrealistic.
          </p>

          <h4 id="requirements-for-steno">What do you need to learn steno?</h4>
          <p>
            You need a true NKRO (N-key roll over) supported keyboard and
            software like Plover (a free and open steno engine).
          </p>
          <ul>
            <li>
              <OutboundLink
                eventLabel="true NKRO (N-key roll over) supported keyboard"
                to="https://plover.wiki/index.php/Supported_hardware#Known_supported_stenotypes"
              >
                True NKRO (N-key roll over) supported keyboards
              </OutboundLink>{" "}
            </li>
            <li>
              <OutboundLink
                eventLabel="stenotype machine"
                to="https://plover.wiki/index.php/Supported_hardware#Stenotype_machines"
              >
                Stenotype machines
              </OutboundLink>{" "}
            </li>
            <li>
              <OutboundLink
                eventLabel="Plover (free and open)"
                to="http://www.openstenoproject.org/plover/"
              >
                Plover
              </OutboundLink>
            </li>
          </ul>

          <h4 id="time-to-learn">How long does it take to learn steno?</h4>
          <p>
            To write text for personal use, such as writing emails and instant
            messages, you could learn basic steno at ~40WPM within 3–6 months.
            To productively use steno to write most text at under 100WPM, it
            might take 6–18&nbsp;months. For live dictation at 200WPM, it might
            take you 2&nbsp;or&nbsp;more years. If you are learning stenography
            for ergonomic reasons and have injuries to manage, it could take
            longer.
          </p>

          <h4 id="discovery">How many new briefs should you learn each day?</h4>
          <p>5–40.</p>
          <p>
            Learning new briefs is like expanding your vocabulary in a new
            language. One rule of thumb in learning languages is to strive for
            15 new words a day, conservatively, or 25 new words a day,
            aggressively. For one day that might not seem like much, but after a
            month that’s about 500 new words.
          </p>

          <h4 id="revision">How many briefs should you revise each day?</h4>
          <p>100–200.</p>

          <h4 id="metronome">Why might you use the metronome?</h4>
          <p>
            Using a metronome might help you improve your rhythm for each stroke
            in finger drills. By drilling difficult transitions between pairs of
            strokes that slow you down or cause you hesitation using a
            metronome, you may improve your slowest pairs.
          </p>

          <h4 id="lesson-categories">What kinds of lessons are there?</h4>
          <ul>
            <li>
              <Link to="/lessons#fundamentals">Fundamentals</Link> let you
              practise the main elements of stenographic theory so you get the
              gist of what keys connect to what sounds and what letters or
              syllables they produce.
            </li>
            <li>
              <Link to="/lessons#drills">Drills</Link> are sets of common,
              randomly ordered words, such as names, dates, pronouns, and
              numbers.
            </li>
            <li>
              <Link to="/lessons#collections">Collections</Link> are sets of
              lessons. They might be domain-specific, such as{" "}
              <Link to="/lessons#tech">tech</Link> lessons, or have stenographic
              or linguistic significance, such as{" "}
              <Link to="/lessons#irreversible-binomials">
                irreversible&nbsp;binomials
              </Link>
              .
            </li>
            <li>
              <Link to="/lessons#stories">Stories</Link> include any lessons
              with words in sentence order, such as{" "}
              <Link to="/lessons#virginia-woolf">Virginia Woolf stories</Link>{" "}
              or{" "}
              <Link to="/lessons#proverbial-phrases">
                proverbial&nbsp;phrases
              </Link>
              .
            </li>
          </ul>

          <h4 id="palantype">What’s a “palantype”?</h4>
          <p>
            Typey&nbsp;Type supports alternative steno key layouts such as
            “palantype”. A palantype is an alternative shorthand machine to a
            stenotype with more keys. That means palantype can have fewer theory
            conflicts and be easier to learn. Meanwhile, stenography is more
            popular and more ergonomic.{" "}
            <OutboundLink
              eventLabel="Learn palantype"
              to="http://www.openstenoproject.org/palantype/tutorial/2016/08/21/learn-palantype.html"
            >
              Learn palantype
            </OutboundLink>{" "}
            and learn more about{" "}
            <OutboundLink
              eventLabel="Palan versus Steno"
              to="http://www.openstenoproject.org/palantype/palantype/2016/08/21/palan-versus-steno.html"
            >
              Palan versus Steno
            </OutboundLink>{" "}
            from the Open Steno Project.
          </p>

          <h3 id="progress">Progress</h3>
          <p>
            See how much{" "}
            <Link to="/progress">
              progress you’ve made with Typey&nbsp;Type
            </Link>
            .
          </p>

          <h3 id="contribute">Want to contribute?</h3>
          <p>
            Learn how to{" "}
            <Link to="/contribute">contribute to Typey&nbsp;Type</Link>.
          </p>

          <h3 id="donate">Donate</h3>
          <p>
            You can support my efforts on{" "}
            <OutboundLink
              eventLabel="Patreon"
              to="https://www.patreon.com/didoesdigital"
            >
              Patreon
            </OutboundLink>
            . A monthly donation helps me build more lessons and features to
            help you fast-track your steno progress.
          </p>

          <h3 id="code">Code on GitHub</h3>
          <p>
            Here’s some of the code used by Typey&nbsp;Type available on GitHub:
          </p>
          <ul>
            <li>
              <OutboundLink
                eventLabel="Typey Type repo"
                to="https://github.com/didoesdigital/typey-type"
              >
                Typey&nbsp;Type repo
              </OutboundLink>
              . This contains the application code that makes Typey&nbsp;Type do
              useful things.
            </li>
            <li>
              <OutboundLink
                eventLabel="Typey Type data repo"
                to="https://github.com/didoesdigital/typey-type-data"
              >
                Typey&nbsp;Type data repo
              </OutboundLink>
              . This project is the result of automated scripts that produce
              lesson data used by Typey&nbsp;Type. The scripts are not included.
            </li>
            <li>
              <OutboundLink
                eventLabel="Steno dictionaries repo"
                to="https://github.com/didoesdigital/steno-dictionaries/"
              >
                Steno dictionaries
              </OutboundLink>
              . This repository contains Di’s stenography dictionaries that
              power Typey&nbsp;Type’s stroke suggestions, as well as extra
              dictionaries for day-to-day steno usage.
            </li>
            <li>
              <OutboundLink
                eventLabel="Stenoboard diagram SVG to React repo"
                to="https://github.com/didoesdigital/typey-type-stenoboard-diagram-svg-to-react"
              >
                Stenoboard diagram SVG to React
              </OutboundLink>
              . This project contains scripts used to manually convert SVG steno
              diagrams into React syntax to be used by the main Typey&nbsp;Type
              repo.
            </li>
          </ul>

          <h3 id="news">Want news?</h3>
          <p>
            Sign up for{" "}
            <OutboundLink
              eventLabel="Typey Type updates and steno news"
              to="https://didoesdigital.com/#newsletter"
            >
              Typey&nbsp;Type updates and steno news
            </OutboundLink>
            .
          </p>

          <h3 id="credits">Credits</h3>
          <ul>
            <li>
              <OutboundLink
                eventLabel="Wikipedia provides homophones"
                to="https://en.wikipedia.org/wiki/Wikipedia:Lists_of_common_misspellings/Homophones"
              >
                Wikipedia provides homophones
              </OutboundLink>
              .
            </li>
            <li>
              <OutboundLink
                eventLabel="Wikipedia provides proverbial phrases"
                to="https://en.wikipedia.org/wiki/List_of_proverbial_phrases"
              >
                Wikipedia provides proverbial phrases
              </OutboundLink>
              .
            </li>
            <li>
              <OutboundLink
                eventLabel="Wikipedia provides proverbs"
                to="https://en.wiktionary.org/wiki/Appendix:English_proverbs"
              >
                Wiktionary provides proverbs
              </OutboundLink>
              .
            </li>
            <li>
              <OutboundLink
                eventLabel="Wikipedia provides irreversible binomials"
                to="https://en.wikipedia.org/wiki/Irreversible_binomial"
              >
                Wikipedia provides irreversible binomials
              </OutboundLink>
              .
            </li>
            <li>
              <OutboundLink
                eventLabel="Wikipedia provides Speech to the Troops at Tilbury"
                to="https://en.wikipedia.org/wiki/Speech_to_the_Troops_at_Tilbury"
              >
                Wikipedia provides Speech to the Troops at Tilbury
              </OutboundLink>
              .
            </li>
            <li>
              {" "}
              <OutboundLink
                eventLabel="Wiktionary provides frequency lists"
                to="https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists"
              >
                Wiktionary provides frequency lists
              </OutboundLink>
              .
            </li>
            <li>
              <OutboundLink
                eventLabel="Metronome sounds come from Dev_Tones by RCP Tones"
                to="https://rcptones.com/dev_tones/"
              >
                The metronome sound, “digi_plink”, comes from Dev_Tones by RCP
                Tones
              </OutboundLink>{" "}
              under a{" "}
              <OutboundLink
                eventLabel="Creative Commons license (CC BY 3.0 US)"
                to="https://creativecommons.org/licenses/by/3.0/us/legalcode"
              >
                Creative Commons license (CC BY 3.0 US)
              </OutboundLink>{" "}
              and was adapted to include silence at the end for a slower
              metronome tempo.
            </li>
          </ul>

          <h3 id="support">Support</h3>
          <p>
            For help with Typey&nbsp;Type,{" "}
            <a href="mailto:typeytype@didoesdigital.com">
              email typeytype@didoesdigital.com
            </a>{" "}
            or{" "}
            <OutboundLink
              eventLabel="post to the feedback form"
              to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
            >
              post to the feedback form
            </OutboundLink>
            .
          </p>

          <h3 id="privacy" tabIndex={-1}>
            Privacy
          </h3>
          <p>
            This site uses{" "}
            <OutboundLink
              eventLabel="Google Analytics"
              to="https://www.google.com/intl/en/policies/privacy/"
            >
              Google Analytics
            </OutboundLink>{" "}
            to track usage data for improving the site using cookies.
            Typey&nbsp;Type anonymises IP addresses before sending them to
            Google and Google Analytics retains cookie data for 26 months.
          </p>
          <p>
            This site uses{" "}
            <OutboundLink eventLabel="Sentry" to="https://sentry.io/privacy/">
              Sentry
            </OutboundLink>{" "}
            for error reporting to improve the site.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Support;
