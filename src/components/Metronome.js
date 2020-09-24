import React, { Component } from 'react';
import { Howl } from 'howler';
import { IconMetronome } from './Icon';
import GoogleAnalytics from 'react-ga';
import plink from '../sounds/digi_plink-with-silence.mp3';

function bpmBracketsSprite() {
  let spriteObj = {};
  for (let bpm = 10; bpm <= 360; bpm += 10) {
    spriteObj[playId(bpm)] = [0, 60000 / bpm];
  }
  return spriteObj;
}

const sound = new Howl({
  src: plink,
  loop: true,
  sprite: bpmBracketsSprite()
});

function playMetronome(options, withAnalytics) {
  let id = 'bpm10';
  if (options && options.id) {
    id = options.id;
  }
  if (!sound.playing()) {
    sound.play(id);
  }

  if (withAnalytics) {
    GoogleAnalytics.event({
      category: 'Metronome',
      action: 'Click button',
      label: 'Start'
    });
  }
}

function stopMetronome(withAnalytics) {
  sound.stop();

  if (withAnalytics) {
    GoogleAnalytics.event({
      category: 'Metronome',
      action: 'Click button',
      label: 'Stop'
    });
  }
}

function playId(beatsPerMinute) {
  if (!(beatsPerMinute) || typeof beatsPerMinute === 'string') {
    beatsPerMinute = 10;
  }
  let bpmBracket = (Math.min(Math.ceil(Math.abs(beatsPerMinute) / 10), 36)) * 10;
  return `bpm${bpmBracket}`
}

class Metronome extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userSettings && prevProps.userSettings.beatsPerMinute !== this.props.userSettings.beatsPerMinute && sound.playing()) {
      stopMetronome();
      playMetronome({id: playId(this.props.userSettings.beatsPerMinute)});
    }
  }

  componentWillUnmount() {
    stopMetronome();
  }

  render() {
    return (
      <p>
        <button aria-label="Start metronome" className="button button--secondary mr2" onClick={() => playMetronome({id: playId(this.props.userSettings.beatsPerMinute)}, 'withAnalytics')}><IconMetronome role="presentation" iconWidth="24" iconHeight="24" className="svg-icon-wrapper svg-baseline" title="Metronome" /> Start</button>
        <button aria-label="Stop metronome" className="button button--secondary" onClick={() => stopMetronome('withAnalytics')}><IconMetronome role="presentation" iconWidth="24" iconHeight="24" className="svg-icon-wrapper svg-baseline" title="Metronome" /> Stop</button>
      </p>
    );
  }
}

export default Metronome;
export {
  bpmBracketsSprite,
  playId
};
