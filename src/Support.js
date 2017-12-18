import React from 'react';

const Support = () => {
  return (
    <div className="p3 mx-auto mw-1024">
      <div className="mw-568">
        <h2>About Typey type for stenographers</h2>
        <p>Typey type is a typing app designed specifically to help <a href="#about-stenography">stenography</a> students learn <abbr title="stenography">steno</abbr> faster. You can learn briefs and improve your stenographic speed and accuracy using tailored education options, including tight feedback loops so you learn to fix misstrokes immediately. You can effortlessly track progress in your brief vocabulary and rapidly increase in steno skill.</p>

        <h3 id="about-stenography">Stenography</h3>
        <p>The process of writing shorthand is called <strong>stenography</strong>. Using a stenotype machine (or a fancy keyboard) and special software, you can type over 100 or even 200 words per minute. When you press keys together on a stenotype machine—like playing a piano chord—the software translates the key combination into meaningful words according to their phonetic sounds. Plover is the world’s first free, open-source stenography program. You can learn more about Plover from the <a href="http://openstenoproject.org/">Open steno project<span className="external-link" aria-label=" (External link)" title="(External link)"></span></a>.</p>

        <h4>Steno terms</h4>
        <dl className="inline-flex">
          <dt>Briefs</dt>
          <dd>Loosely, a brief or outline is the specified combination of keys pressed together to produce a specific word or phrase.</dd>
          <dt>Strokes</dt>
          <dd>A stroke is a combination of keys held together a released to write a word or sound. A multi-stroke brief is a combination of strokes pressed in order to produce a word or phrase (usually of more syllables).</dd>
          <dt>Plover</dt>
          <dd><a href="http://www.openstenoproject.org/plover/">Plover<span className="external-link" aria-label=" (External link)" title="(External link)"></span></a> is the world’s first free, open-source stenography program that works cross-platform on Windows, mac OS, and *nix operating systems.</dd>
        </dl>

        <h3>Typey type notes</h3>
        <p>Typey type embraces ideas of <a href="https://en.wikipedia.org/wiki/Spaced_repetition">spaced repetitions<span className="external-link" aria-label=" (External link)" title="(External link)"></span></a> and <a href="https://en.wikipedia.org/wiki/Practice_(learning_method)#Deliberate_practice">deliberate practice<span className="external-link" aria-label=" (External link)" title="(External link)"></span></a> to teach steno effectively.</p>
        <p>When you stop a lesson before reaching the end or you complete a lesson, Typey type will save your progress, including all the new words you’ve successfully met. If you leave a lesson without stopping it or finishing it, you’ll lose that lesson’s progress.</p>

        <h4>Typey type terms</h4>
        <dl className="inline-flex">
          <dt>Spacing</dt>
          <dd>Typey type lets you choose where spaces should appear in a phrase for checking if you typed it correctly. This is because steno software can be used to automatically insert spaces before or after words, depending on the specific software and its settings. For example, Plover inserts spaces before words by default, and has a setting to insert spaces after words. Plover also provides extra spacing and capitalisation modes that can be set on the fly to suppress spaces or insert other punctuation (like dashes). A QWERTYist may feel more comfortable drilling words without any spaces, or sentences with spaces as the end.</dd>
          <dt>Seen words</dt>
          <dd>Typey type tracks words you’ve "seen" or "met". Each time you successfully type a new word, that’s logged as a successful meeting.</dd>
          <dt>Words per minute (WPM)</dt>
          <dd>To track your typing speed, Typey type displays the number of words you’ve typed per minute using the unit "words per minute (WPM)", where a word is considered to be 5 letters long on average. This means you might type many short words and have a higher WPM score.</dd>
          <dt>Discover</dt>
          <dd>The first type of study session lets you discover new briefs by showing only a limited number of new words while revealing their strokes. Write these words slowly, concentrating on accuracy and forming good habits around how you stroke word parts. Focus on lessons with interesting words, especially top words for your needs (such as common English words for general usage or domain specific phrases for steno in particular industries).</dd>
          <dt>Revise</dt>
          <dd>The next type of study session helps you revise recently learned briefs by showing only words you’ve seen. Apply effort in recalling these briefs before showing strokes, and avoid fingerspelling or stroking out long, phonetic forms of words so you can memorise the rehearse the best brief for every word. Choose a lesson with the majority of words you’re interested in nailing first like the top 10000 English words.</dd>
          <dt>Drill</dt>
          <dd>The third type of study session is about building up your muscle memory and testing your skills. Write as fast and furiously as you can and aim for a high WPM score. Pick specific drills that focus on a certain kind of brief or many similar words so you can associate them together.</dd>
          <dt>Practice</dt>
          <dd>The final type of study session lets you mimic real usage as closely as possible. Write as fast as you can without causing misstrokes. Explore stories that use real sentences.</dd>
        </dl>

        <h3>Learning stenography</h3>
        <h4>How long does it take to learn steno?</h4>
        <p>To write text for personal use, such as writing emails and instant messages, you could learn basic steno at ~40WPM within 3–6 months. To productively use steno to write most text at under 100WPM, it might take 6–18&nbsp;months. For live dictation at 200WPM, it might take you 2&nbsp;or&nbsp;more years. If you are learning stenography for ergonomic reasons and have injuries to manage, it could take longer.</p>

        <h4>How many new briefs should you learn each day?</h4>
        <p>5–40.</p>
        <p>Learning new briefs is like expanding your vocabulary in a new language. One rule of thumb in learning languages is to strive for 15 new words a day, conservatively, or 25 new words a day, aggressively. For one day that might not seem like much, but after a month that’s about 500 new words.</p>

        <h4>How many briefs should you revise each day?</h4>
        <p>100–200.</p>

        <h3>Support</h3>
        <p>For help with Typey type, <a href="mailto:typeytype@didoesdigital.com">email typeytype@didoesdigital.com</a> or <a href="https://twitter.com/didoesdigital">tweet @DiDoesDigital</a>.</p>
      </div>
    </div>
  )
}

export default Support;
