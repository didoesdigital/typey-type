import React, {
  FC,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Howl } from "howler";
import MetronomeIcon from "../../../components/Icons/icon-images/Metronome.svg";
import Icon from "../../../components/Icons/Icon";
import { Tooltip } from "react-tippy";
import GoogleAnalytics from "react-ga4";
import plink from "../../../sounds/digi_plink-with-silence.mp3";
import useAnnounceTooltip from "../../../components/Announcer/useAnnounceTooltip";

import { useAtomValue } from "jotai";
import { beatsPerMinuteState } from "../../../states/userSettingsState";

type Props = {
};

type Options = {
  id: string;
};

let sound: Howl | null = null;

function bpmBracketsSprite() {
  const spriteObj: { [key: string]: [number, number] } = {};
  for (let bpm = 10; bpm <= 360; bpm += 10) {
    spriteObj[playId(bpm)] = [0, 60000 / bpm];
  }
  return spriteObj;
}

function playMetronome(
  options: Options,
  setUserGestureToStartMetronome: Dispatch<SetStateAction<boolean>>,
  withAnalytics?: string
) {
  if (sound) {
    sound.loop(false);
    sound = null;
    Howler.stop();
    Howler.unload();
  }

  sound = new Howl({
    src: plink,
    loop: true,
    sprite: bpmBracketsSprite(),
    onstop: function () {
      if (sound) {
        sound.off();
        sound.unload();
      }
    },
  });

  setUserGestureToStartMetronome(true);

  const id = options?.id ? options.id : "bpm10";
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
  if (sound) {
    sound.loop(false);
  }
  Howler.stop();
  Howler.unload();
  sound = null;

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

const Metronome: FC<Props> = (props) => {
  const beatsPerMinuteSetting = useAtomValue(beatsPerMinuteState);
  const prevBpmRef = useRef<number>(10);
  const announceTooltip = useAnnounceTooltip();

  const [userGestureToStartMetronome, setUserGestureToStartMetronome] =
    useState(false);

  const beatsPerMinute = beatsPerMinuteSetting ?? null;

  useEffect(() => {
    if (userGestureToStartMetronome && prevBpmRef.current !== beatsPerMinute) {
      stopMetronome.call(this);

      setTimeout(() => {
        playMetronome.call(
          this,
          {
            id: playId(beatsPerMinute),
          },
          setUserGestureToStartMetronome
        );
      }, 0);
    }
  }, [beatsPerMinute, userGestureToStartMetronome]);

  useEffect(() => {
    prevBpmRef.current = beatsPerMinute;
  }, [beatsPerMinute]);

  useEffect(() => {
    return () => {
      stopMetronome.call(this);
    };
  }, []);

  return (
    <p>
      <button
        aria-label="Start metronome"
        className="button button--secondary mr2"
        onClick={() =>
          playMetronome.call(
            this,
            { id: playId(beatsPerMinuteSetting) },
            setUserGestureToStartMetronome,
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
          onShow={announceTooltip}
        >
          <Icon
            iconSVGImport={MetronomeIcon}
            width="1em"
            height="1em"
            style={{ transform: "translateY(0.125em)" }}
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
          onShow={announceTooltip}
        >
          <Icon
            iconSVGImport={MetronomeIcon}
            width="1em"
            height="1em"
            style={{ transform: "translateY(0.125em)" }}
          />{" "}
          Stop
        </Tooltip>
      </button>
    </p>
  );
};

export default Metronome;
export { bpmBracketsSprite, playId };
