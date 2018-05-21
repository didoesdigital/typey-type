import { chooseFlashcardsToShow } from './Flashcards';

describe('chooseFlashcardsToShow', () => {
  const state = {
    flashcardsMetWords: {
      "The": {
        phrase: 'The',
        stroke: '-T',
        times_seen: [1526815977]
      }
    },
    sourceMaterial: [
      {
        phrase: 'steno',
        stroke: 'STOEUPB'
      }
    ]
  };

  it('returns flashcards to show in this lesson', () => {
    expect(chooseFlashcardsToShow(state.sourceMaterial, state.flashcardsMetWords, 30)).toEqual(
      ["steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "steno", "STOEUPB", "Finished!"]
    );
  });
});

