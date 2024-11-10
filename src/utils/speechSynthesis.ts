import describePunctuation, { punctuationDescriptions } from "./describePunctuation";

/** @type {SpeechSynthesis | null} */
export let synth: SpeechSynthesis | null = null;
try {
  synth = window.speechSynthesis;
}
catch (e) {
  console.log("This device doesn't support speechSynthesis", e);
}

/** @type {SpeechSynthesisVoice[]} */
let voices: SpeechSynthesisVoice[] = [];


/** @param { string } stenoLayout */
function getSpeechSynthesisFalbackLang(stenoLayout: string) {
  const lang = navigator.language;
  if (lang && (lang === "de" || lang.startsWith("de-")) && stenoLayout === "stenoLayoutPalantype") {
    return lang
  }
  return "en";
}


function getSpeechSynthesisRate(timeElapsedMillis: number, totalNumberOfMatchedWords: number) {
  // TODO: scale the rate in proportion to:
  // A) words per minute and
  // B) length of word as a proxy for the time it takes to say a long word
  // Note: this likely has floating point math rounding errors.
  const wordsPerMinute =
    timeElapsedMillis > 0
      ? totalNumberOfMatchedWords /
        (timeElapsedMillis / 60 / 1000)
      : 0;
  return (wordsPerMinute > 100 ? 2 : 1);
}


/** @param { string } utteranceText */
export function synthesizeSpeech(
  utteranceText: string,
  {
    voiceURI,
    voiceName,
    stenoLayout,
    timeElapsedMillis,
    totalNumberOfMatchedWords,
  }: {
    voiceURI: string,
    voiceName: string,
    stenoLayout: string,
    timeElapsedMillis: number,
    totalNumberOfMatchedWords: number,
  }
) {
  try {
    if (synth && synth.speaking) {
      synth.cancel();
    }

    utteranceText = utteranceText.replaceAll("—", "em dash");
    if (utteranceText in punctuationDescriptions) {
      utteranceText = describePunctuation(utteranceText);
    }

    if (window.SpeechSynthesisUtterance) {
      if (!voices || !voices.length) {
        voices = synth?.getVoices() ?? [];
      }

      let utterThis = new SpeechSynthesisUtterance(utteranceText);
      // Debugging:
      // utterThis.onerror = function (event) {
      //   console.warn(`${event.error}: ${this.text}`);
      // };

      const preferredVoiceURI = voiceURI;
      const preferredVoiceName = voiceName;
      const voiceInVoices =
        voices.find((voice) => voice.voiceURI === preferredVoiceURI) ??
        voices.find((voice) => voice.name === preferredVoiceName);

      if (voiceInVoices) {
        utterThis.lang = voiceInVoices.lang;
        utterThis.voice = voiceInVoices;
      }

      // No lang?
      if (!utterThis.lang) {
        utterThis.lang = getSpeechSynthesisFalbackLang(stenoLayout);
      }

      utterThis.rate = getSpeechSynthesisRate(timeElapsedMillis, totalNumberOfMatchedWords);

      // @ts-ignore 'chrome' isn't on Window because it is browser specific and that's why we are using it to check for chromium browsers
      const isChromium = !!window.chrome;
      const timeoutDelay = isChromium ? 50 : 0;
      setTimeout(function () {
        synth?.speak(utterThis);
      }, timeoutDelay);
    }
  } catch (e) {
    console.warn("Unable to speak material", e);
  }
}
