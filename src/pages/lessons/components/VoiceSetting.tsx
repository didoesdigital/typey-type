import React, { useCallback, useEffect, useState } from "react";
import { Tooltip } from "react-tippy";

type Props = {
  changeVoiceUserSetting: (voiceName: string) => void;
  disableUserSettings: boolean;
  setAnnouncementMessage: () => void;
  speakMaterial: boolean;
  voiceName: SpeechSynthesisVoice["name"];
};

const voiceSort = (a: SpeechSynthesisVoice, b: SpeechSynthesisVoice) => {
  /** e.g. "en" */
  const lang = navigator.language;

  if (a.lang === "en-AU" && b.lang !== "en-AU") return -1;
  if (b.lang === "en-AU" && a.lang !== "en-AU") return 1;

  if (a.lang === lang && b.lang !== lang) return -1;
  if (b.lang === lang && a.lang !== lang) return 1;

  /**
   * e.g. ['en', 'de', 'ja', 'ru']
   * e.g. ["en-GB", "en"]
   */
  const langs = navigator.languages;

  // Prioritise language:
  for (let i = 0; i < langs.length; i++) {
    if (a.lang === langs[i] && b.lang !== langs[i]) return -1;
    if (b.lang === langs[i] && a.lang !== langs[i]) return 1;
  }

  // Prioritise "en-GB" or "en" if langs includes ["en", "en-US"]:
  for (let i = 0; i < langs.length; i++) {
    /** e.g. "en" */
    const twoLetterLang = langs[i].slice(0, 2);
    if (a.lang.startsWith(twoLetterLang) && !b.lang.startsWith(twoLetterLang))
      return -1;
    if (b.lang.startsWith(twoLetterLang) && !a.lang.startsWith(twoLetterLang))
      return 1;
  }

  return a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name);
};

const testSay = (voiceName: SpeechSynthesisVoice["name"]) => {
  try {
    const synth = window.speechSynthesis;
    if (window.SpeechSynthesisUtterance) {
      if (synth && synth.speaking) {
        synth.cancel();
      }
      const utterThis = new SpeechSynthesisUtterance(
        "The rain in Spain stays mainly in the plain"
      );

      const voices = speechSynthesis.getVoices();
      const voiceInVoices = voices.find((voice) => voice.name === voiceName);

      if (voiceInVoices) {
        utterThis.lang = voiceInVoices.lang;
        utterThis.voice = voiceInVoices;
      }

      synth?.speak(utterThis);
    }
  } catch (e) {
    console.log("Unable to speak test material", e);
  }
};

const VoiceSetting = ({
  changeVoiceUserSetting,
  disableUserSettings,
  setAnnouncementMessage,
  speakMaterial,
  voiceName,
}: Props) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = speakMaterial ? window.speechSynthesis : null;

  const loadVoices = useCallback(() => {
    if (synth) {
      const sortedVoices = synth.getVoices().sort(voiceSort);
      setVoices(sortedVoices);
    }
  }, [synth]);

  if (synth && "onvoiceschanged" in synth && speakMaterial) {
    synth.onvoiceschanged = loadVoices;
  }

  useEffect(() => {
    if (speakMaterial) {
      loadVoices();
    }
  }, [loadVoices, speakMaterial]);

  const handleTestVoice = () => {
    if (!disableUserSettings && speakMaterial) {
      testSay(voiceName);
    }
  };

  return (
    <div style={{ marginTop: "-0.5em" }}>
      <div className="mt1 mb1 pl1 pr2 flex flex-column">
        {/* @ts-ignore */}
        <Tooltip
          title="Set your voice"
          className="mw-240"
          animation="shift"
          arrow="true"
          duration="200"
          tabIndex="0"
          tag="span"
          theme="didoesdigital didoesdigital-sm"
          trigger="mouseenter focus click"
          onShow={setAnnouncementMessage}
        >
          <label className="mr1 db" htmlFor="speak-words-voice">
            Speak words: voice
          </label>
        </Tooltip>
        <div className="flex flex-wrap items-center gap-1">
          <select
            name="speak-words-voice"
            id="speak-words-voice"
            value={voiceName}
            onChange={(event) => {
              const voiceName = event.target.value;
              changeVoiceUserSetting(voiceName);
            }}
            disabled={disableUserSettings && !speakMaterial}
            className="form-control w-144 mr-1"
          >
            {voices.map((voice) => (
              <option value={voice.name} key={voice.name}>
                {voice.name} - {voice.lang}
              </option>
            ))}
          </select>
          <button
            className="button button--secondary text-small-test-say-word-button mr1"
            onClick={handleTestVoice}
            type="button"
          >
            Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceSetting;
