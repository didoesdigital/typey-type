import React from 'react';

const Support = () => {
  return (
    <div className="p3 mx-auto mw-1024">
      <h2>About Typey type</h2>
      <p>Typey type is a typing app designed specifically to help <a href="#about-stenography">stenography</a> students learn <abbr title="stenography">steno</abbr> faster. You can learn briefs and improve your stenographic speed and accuracy using tailored education options, including tight feedback loops so you learn to fix misstrokes immediately. You can effortlessly track progress in your brief vocabulary and rapidly increase in steno skill.</p>

      <h3 id="about-stenography">Stenography</h3>
      <p>The process of writing shorthand is called <strong>stenography</strong>. Using a stenotype machine (or a fancy keyboard) and special software, you can type over 100 or even 200 words per minute. When you press keys together on a stenotype machine—like playing a piano chord—the software translates the key combination into meaningful words according to their phonetic sounds. Plover is the world’s first free, open-source stenography program. You can learn more about Plover from the <a href="http://openstenoproject.org/">Open steno project</a>.</p>

      <h4>Steno and Typey type terms</h4>
      <dl>
        <dt>Briefs</dt>
        <dd>Loosely, a brief or outline is the specified combination of keys pressed together to produce a specific word or phrase.</dd>
        <dt>Strokes</dt>
        <dd>A stroke is a combination of keys held together a released to write a word or sound. A multi-stroke brief is a combination of strokes pressed in order to produce a word or phrase (usually of more syllables).</dd>
        <dt>Plover</dt>
        <dd><a href="http://openstenoproject.org/">Plover</a> is the world’s first free, open-source stenography program that works cross-platform on Windows, mac OS, and *nix operating systems.</dd>
        <dt>Spacing</dt>
        <dd>Steno software can be used to automatically insert spaces before or after words, depending on the specific software and its settings. For example, Plover inserts spaces before words by default, and has a setting to insert spaces after words, as well as providing alternative spacing and capitalisation modes that can be set on the fly to suppress spaces or insert other punctuation (like dashes). For this reason, Typey type lets you choose where spaces should appear in a phrase for checking if you typed it correctly.</dd>
        <dt>Met words</dt>
        <dd>Typey type tracks words you’ve "met" or "seen". Each time you successfully type a new word, that’s logged as a successful meeting.</dd>
        <dt>Words per minute</dt>
        <dd>To track your typing speed, Typey type displays the number of words you’ve typed per minute using the unit "words per minute (WPM)", where a word is considered to be 5 letters long on average. This means you might type many short words and have a higher WPM score.</dd>
      </dl>
      <h3>Typey type notes</h3>
      <p>When you stop a lesson before reaching the end or you complete a lesson, Typey type will save your progress, including all the new words you’ve successfully met. If you leave a lesson without stopping it or finishing it, you’ll lose that lesson’s progress.</p>
      <h3>FAQ</h3>
      <h4>How many new briefs should I learn per day?</h4>
      <p>5–40.</p>
      <p>Learning new briefs is like expanding your vocabulary in a new language. One rule of thumb in learning languages is to strive for 15 new words a day, conservatively, or 25 new words a day, aggressively. For one day that might not seem like much, but after a month that’s about 500 new words.</p>
      <h4>How many briefs should I revise per day?</h4>
      <p>100–200.</p>

      <h3>Support</h3>
      <p>For help with Typey type, <a href="mailto:typeytype@didoesdigital.com">email typeytype@didoesdigital.com</a> or <a href="https://twitter.com/didoesdigital">tweet @DiDoesDigital</a>.</p>
    </div>
  )
}

export default Support;
