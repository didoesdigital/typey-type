import React, { Component } from "react";
import { Howl } from "howler";
import { IconMetronome } from "../../../components/Icon";
import { Tooltip } from "react-tippy";
import GoogleAnalytics from "react-ga";
import plink from "../../../sounds/digi_plink-with-silence.mp3";

import type { UserSettings } from "../../../types";

type Props = {
  userSettings: UserSettings;
  setAnnouncementMessage: (app: any, content: string | Object) => void;
};

type Options = {
  id: string;
};

function bpmBracketsSprite() {
  const spriteObj: { [key: string]: [number, number] } = {};
  for (let bpm = 10; bpm <= 360; bpm += 10) {
    spriteObj[playId(bpm)] = [0, 60000 / bpm];
  }
  return spriteObj;
}

function playMetronome(options: Options, withAnalytics?: string) {
  let sound = new Howl({
    src: plink,
    loop: true,
    sprite: bpmBracketsSprite(),
  });

  // @ts-ignore 'this' implicitly has type 'any'
  this.setState({ player: sound, userGestureToStartMetronome: true });

  let id = "bpm10";
  if (options && options.id) {
    id = options.id;
  }
  if (!sound.playing()) {
    sound.play(id);
  }
  if (withAnalytics) {
    GoogleAnalytics.event({
      category: "Metronome",
      action: "Click button",
      label: "Start",
    });
  }
}

function stopMetronome(withAnalytics?: string) {
  // @ts-ignore 'this' implicitly has type 'any'
  const sound = this.state.player;
  if (sound) {
    sound.stop();
    sound.off();
    sound.unload();
  }
  // @ts-ignore
  this.setState({ player: null });

  if (withAnalytics) {
    GoogleAnalytics.event({
      category: "Metronome",
      action: "Click button",
      label: "Stop",
    });
  }
}

function playId(beatsPerMinute: number) {
  if (!beatsPerMinute || typeof beatsPerMinute === "string") {
    beatsPerMinute = 10;
  }
  const bpmBracket =
    Math.min(Math.ceil(Math.abs(beatsPerMinute) / 10), 36) * 10;
  return `bpm${bpmBracket}`;
}

class Metronome extends Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      player: null,
      userGestureToStartMetronome: false,
    };
  }

  componentDidUpdate(prevProps: { [keyName: string]: any }) {
    if (
      // @ts-ignore Property 'userGestureToStartMetronome' does not exist on type
      this.state.userGestureToStartMetronome &&
      this.props.userSettings &&
      prevProps.userSettings.beatsPerMinute !==
        this.props.userSettings.beatsPerMinute
    ) {
      stopMetronome.call(this);
      playMetronome.call(this, {
        id: playId(this.props.userSettings.beatsPerMinute),
      });
    }
  }

  componentWillUnmount() {
    stopMetronome.call(this);
  }

  render() {
    return (
      <p>
        <button
          aria-label="Start metronome"
          className="button button--secondary mr2"
          onClick={() =>
            playMetronome.call(
              this,
              { id: playId(this.props.userSettings.beatsPerMinute) },
              "withAnalytics"
            )
          }
        >
          {/* @ts-ignore */}
          <Tooltip
            title="Start the metronome for finger drills and improving rhythm"
            className="mw-240"
            animation="shift"
            arrow="true"
            duration="200"
            tabIndex="0"
            tag="span"
            theme="didoesdigital didoesdigital-sm"
            trigger="mouseenter focus click"
            onShow={this.props.setAnnouncementMessage}
          >
            <IconMetronome
              role="presentation"
              iconWidth="24"
              iconHeight="24"
              className="svg-icon-wrapper svg-baseline"
              title="Metronome"
            />{" "}
            Start
          </Tooltip>
        </button>
        <button
          aria-label="Stop metronome"
          className="button button--secondary"
          onClick={() => stopMetronome.call(this, "withAnalytics")}
        >
          {/* @ts-ignore */}
          <Tooltip
            title="Stop the metronome"
            className="mw-240"
            animation="shift"
            arrow="true"
            duration="200"
            tabIndex="0"
            tag="span"
            theme="didoesdigital didoesdigital-sm"
            trigger="mouseenter focus click"
            onShow={this.props.setAnnouncementMessage}
          >
            <IconMetronome
              role="presentation"
              iconWidth="24"
              iconHeight="24"
              className="svg-icon-wrapper svg-baseline"
              title="Metronome"
            />{" "}
            Stop
          </Tooltip>
        </button>
      </p>
    );
  }
}

export default Metronome;
export { bpmBracketsSprite, playId };
