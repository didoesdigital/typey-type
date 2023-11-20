import React, { useCallback, useEffect, useState } from "react";

type Props = {
  changeVoiceUserSetting: (voiceName: string, voiceURI: string) => void;
  disableUserSettings: boolean;
  speakMaterial: boolean;
  voiceName: SpeechSynthesisVoice["name"];
  voiceURI: SpeechSynthesisVoice["voiceURI"];
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

const testSay = (
  voiceName: SpeechSynthesisVoice["name"],
  voiceURI: SpeechSynthesisVoice["voiceURI"]
) => {
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
      const voiceInVoices =
        voices.find((voice) => voice.voiceURI === voiceURI) ??
        voices.find((voice) => voice.name === voiceName);

      if (voiceInVoices) {
        utterThis.lang = voiceInVoices.lang;
        utterThis.voice = voiceInVoices;
      }

      // @ts-ignore 'chrome' isn't on Window because it is browser specific and that's why we are using it to check for chromium browsers
      const isChromium = !!window.chrome;
      const timeoutDelay = isChromium ? 50 : 0;
      setTimeout(function () {
        synth?.speak(utterThis);
      }, timeoutDelay);
    }
  } catch (e) {
    console.log("Unable to speak test material", e);
  }
};

const VoiceSetting = ({
  changeVoiceUserSetting,
  disableUserSettings,
  speakMaterial,
  voiceName,
  voiceURI,
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
      testSay(voiceName, voiceURI);
    }
  };

  return (
    <div style={{ marginTop: "-0.5em" }}>
      <div className="mt1 mb1 pl1 pr2 flex flex-column">
        <label className="mr1 db" htmlFor="speak-words-voice">
          Speak words: voice
        </label>
        <div className="flex flex-wrap items-center gap-1">
          <select
            name="speak-words-voice"
            id="speak-words-voice"
            value={voiceURI}
            onChange={(event) => {
              const voiceName = event.target.value;
              const voiceURI =
                event.target[event.target.selectedIndex].getAttribute(
                  "data-uri"
                ) ?? "";
              changeVoiceUserSetting(voiceName, voiceURI);
            }}
            disabled={disableUserSettings && !speakMaterial}
            className="form-control w-144 mr-1"
          >
            {voices.map((voice) => (
              <option
                value={voice.voiceURI}
                data-name={voice.name}
                data-uri={voice.voiceURI}
                key={voice.voiceURI}
              >
                {voice.name} - {voice.lang}
                {voice.voiceURI.includes("super-compact")
                  ? " - super compact"
                  : ""}
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
