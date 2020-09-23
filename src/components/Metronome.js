import React, { Component } from 'react';
import { Howl } from 'howler';
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

function playMetronome(options) {
  let id = 'bpm60';
  if (options && options.id) {
    id = options.id;
  }
  sound.play(id);
}

function stopMetronome() {
  sound.stop();
}

function playId(beatsPerMinute) {
  if (!(beatsPerMinute)) {
    beatsPerMinute = 10;
  }
  let bpmBracket = (Math.min(Math.floor(Math.abs(beatsPerMinute) / 10), 36) + 1) * 10;
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
        <button className="button button--secondary mr2" onClick={() => playMetronome({id: playId(this.props.userSettings.beatsPerMinute)})}>Start metronome</button>
        <button className="button button--secondary" onClick={() => stopMetronome()}>Stop metronome</button>
      </p>
    );
  }
}

export default Metronome;
