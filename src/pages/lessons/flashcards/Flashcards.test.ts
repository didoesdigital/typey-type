import {
  chooseFlashcardsToShow,
  getCurrentSlideContentAndType,
  getFlashcardsRungThreshold,
  getStrokeForCurrentSlideContent,
  getWordForCurrentStrokeSlideIndex
} from './utilities';

describe('chooseFlashcardsToShow', () => {
  describe('for words you have never seen when revising recent mistakes', () => {
    const state = {
      sourceMaterial: [ { phrase: 'the', stroke: '-T' }, { phrase: 'it', stroke: 'T' }, { phrase: 'and', stroke: 'SKP' }, { phrase: 'a', stroke: 'AEU' }, ],
      flashcardsMetWords: { "the": { phrase: 'the', stroke: '-T', rung: 2 }, "it": { phrase: 'it', stroke: 'T', rung: 1 }, "and": { phrase: 'and', stroke: 'SKP', rung: 0 }, }
    };
    const numberOfFlashcardsToShow = 30;
    const threshold = 1;
    it('should return words unseen, rung 0, or rung 1 as flashcards to show in this lesson', () => {
      expect(chooseFlashcardsToShow(state.sourceMaterial, state.flashcardsMetWords, numberOfFlashcardsToShow, threshold)).toEqual(
        [
          {
            phrase: 'it',
            stroke: 'T'
          },
          {
            phrase: 'and',
            stroke: 'SKP'
          },
          {
            phrase: 'a',
            stroke: 'AEU'
          }
        ]
      );
    });
  });

  describe('for words you have memorised when you only want to see 1 flashcard', () => {
    const state = {
      sourceMaterial: [ { phrase: 'the', stroke: '-T' }, { phrase: 'it', stroke: 'T' }, { phrase: 'and', stroke: 'SKP' }, { phrase: 'a', stroke: 'AEU' }, ],
      flashcardsMetWords: { "the": { phrase: 'the', stroke: '-T', rung: 2 }, "it": { phrase: 'it', stroke: 'T', rung: 1 }, "and": { phrase: 'and', stroke: 'SKP', rung: 0 }, }
    };
    const numberOfFlashcardsToShow = 1;
    const threshold = 30;
    it('should return 1 of all the words as flashcards to show', () => {
      expect(chooseFlashcardsToShow(state.sourceMaterial, state.flashcardsMetWords, numberOfFlashcardsToShow, threshold)).toEqual(
        [
          {
            phrase: 'the',
            stroke: '-T'
          }
        ]
      );
    });
  });

  describe('for words you have never seen when revising recent mistakes', () => {
    const state = {
      sourceMaterial: [ { phrase: 'the', stroke: '-T' }, { phrase: 'it', stroke: 'T' }, { phrase: 'and', stroke: 'SKP' }, { phrase: 'a', stroke: 'AEU' }, ],
      flashcardsMetWords: { "the": { phrase: 'the', stroke: '-T', rung: 2 }, "it": { phrase: 'it', stroke: 'T', rung: 1 }, "and": { phrase: 'and', stroke: 'SKP', rung: 0 }, }
    };
    const numberOfFlashcardsToShow = 30;
    const threshold = 0;
    it('should return words unseen or rung 0 as flashcards to show', () => {
      expect(chooseFlashcardsToShow(state.sourceMaterial, state.flashcardsMetWords, numberOfFlashcardsToShow, threshold)).toEqual(
        [
          {
            phrase: 'and',
            stroke: 'SKP'
          },
          {
            phrase: 'a',
            stroke: 'AEU'
          }
        ]
      );
    });
  });

  describe('for words you have never seen when revising old, memorised words', () => {
    const state = {
      sourceMaterial: [ { phrase: 'the', stroke: '-T' }, { phrase: 'it', stroke: 'T' }, { phrase: 'and', stroke: 'SKP' }, { phrase: 'a', stroke: 'AEU' }, ],
      flashcardsMetWords: { "the": { phrase: 'the', stroke: '-T', rung: 2 }, "it": { phrase: 'it', stroke: 'T', rung: 1 }, "and": { phrase: 'and', stroke: 'SKP', rung: 0 }, }
    };
    const numberOfFlashcardsToShow = 30;
    const threshold = 29;
    it('should return all the words as flashcards to show', () => {
      expect(chooseFlashcardsToShow(state.sourceMaterial, state.flashcardsMetWords, numberOfFlashcardsToShow, threshold)).toEqual(
        [
          {
            phrase: 'the',
            stroke: '-T'
          },
          {
            phrase: 'it',
            stroke: 'T'
          },
          {
            phrase: 'and',
            stroke: 'SKP'
          },
          {
            phrase: 'a',
            stroke: 'AEU'
          }
        ]
      );
    });
  });
});

describe('getCurrentSlideContentAndType', () => {
  const flashcards = [
    {
      phrase: 'it',
      stroke: 'T'
    },
    {
      phrase: 'and',
      stroke: 'SKP'
    }
  ]
  it('first flashcard should be a phrase', () => {
    expect(getCurrentSlideContentAndType(flashcards, 0)).toEqual(["it", "phrase"]);
  });
  it('second flashcard should be a stroke', () => {
    expect(getCurrentSlideContentAndType(flashcards, 1)).toEqual(["T", "stroke"]);
  });
  it('third flashcard should be a phrase', () => {
    expect(getCurrentSlideContentAndType(flashcards, 2)).toEqual(["and", "phrase"]);
  });
  it('fourth flashcard should be a stroke', () => {
    expect(getCurrentSlideContentAndType(flashcards, 3)).toEqual(["SKP", "stroke"]);
  });
  it('fifth flashcard should be a finished slide', () => {
    expect(getCurrentSlideContentAndType(flashcards, 4)).toEqual(["Finished!", "finished"]);
  });
  it('should have no sixth flashcard and return a finished slide', () => {
    expect(getCurrentSlideContentAndType(flashcards, 5)).toEqual(["Finished…", "finished"]);
  });
});

describe('getFlashcardsRungThreshold', () => {
  describe('when study schedule starts at 30 min and intervals multiply by 2', () => {
    const baseUnitInMinutes = 30;
    const multiplier = 2;

    describe('and flashcards were last seen 2 minutes ago', () => {
      const timeAgoInMinutes = 2;
      it('should return rung 0', () => {
        expect(getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier)).toEqual(0);
      });
    });

    describe('and flashcards were last seen 40 minutes ago', () => {
      const timeAgoInMinutes = 40;
      it('should return rung 1 (or lower)', () => {
        expect(getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier)).toEqual(1);
      });
    });

    describe('and flashcards were last seen 400 minutes ago', () => {
      const timeAgoInMinutes = 400; // 400 min would be 4–8hrs
      it('should return rung 4 (or lower)', () => {
        expect(getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier)).toEqual(4);
      });
    });

    describe('and flashcards were last seen 7600 minutes ago', () => {
      const timeAgoInMinutes = 7600; // 7680 min would be >5 days
      it('should return rung 8 (or lower)', () => {
        expect(getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier)).toEqual(8);
      });
    });
  });

  describe('when study schedule starts at 10 min and intervals multiply by 5', () => {
    const baseUnitInMinutes = 10;
    const multiplier = 5;

    describe('and flashcards were last seen 2 minutes ago', () => {
      const timeAgoInMinutes = 2;
      it('should return rung 0', () => {
        expect(getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier)).toEqual(0);
      });
    });

    describe('and flashcards were last seen 40 minutes ago', () => {
      const timeAgoInMinutes = 40;
      it('should return rung 1 (or lower)', () => {
        expect(getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier)).toEqual(1);
      });
    });

    describe('and flashcards were last seen 6000 minutes ago', () => {
      const timeAgoInMinutes = 6000; // 6000 min would be >4 days
      it('should return rung 4 (or lower)', () => {
        expect(getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier)).toEqual(4);
      });
    });

    describe('and flashcards were last seen 3900000 minutes ago', () => {
      const timeAgoInMinutes = 3900000; // 3906250 min would be >7 years
      it('should return rung 8 (or lower)', () => {
        expect(getFlashcardsRungThreshold(timeAgoInMinutes, baseUnitInMinutes, multiplier)).toEqual(8);
      });
    });
  });
});

describe('getWordForCurrentStrokeSlideIndex', () => {
  const flashcards = [
    {
      phrase: 'it',
      stroke: 'T'
    },
    {
      phrase: 'and',
      stroke: 'SKP'
    }
  ]
  it('first slide index word for stroke should be empty because it is a word', () => {
    expect(getWordForCurrentStrokeSlideIndex(flashcards, 0)).toEqual("");
  });
  it('second slide index word for stroke should be a valid word', () => {
    expect(getWordForCurrentStrokeSlideIndex(flashcards, 1)).toEqual("it");
  });
  it('third slide index word for stroke should be empty because it is a word', () => {
    expect(getWordForCurrentStrokeSlideIndex(flashcards, 2)).toEqual("");
  });
  it('fourth index word for stroke should be a valid word', () => {
    expect(getWordForCurrentStrokeSlideIndex(flashcards, 3)).toEqual("and");
  });
  it('fifth slide index word for stroke should be empty because it is a word', () => {
    expect(getWordForCurrentStrokeSlideIndex(flashcards, 4)).toEqual("");
  });
  it('sixth slide index word for stroke should be empty because there are not that many slides', () => {
    expect(getWordForCurrentStrokeSlideIndex(flashcards, 5)).toEqual("");
  });
});

describe('getStrokeForCurrentSlideContent', () => {
  const sourceMaterial = [
    {
      phrase: 'Loading flashcards…',
      stroke: 'HRAOGD/SKWR-RBGS TPHRARB/TK-LS/KARDZ'
    },
  ];
  const word = 'Loading flashcards…';
  it('stroke should match stroke for phrase in sourceMaterial', () => {
    expect(getStrokeForCurrentSlideContent(word, sourceMaterial)).toEqual("HRAOGD/SKWR-RBGS TPHRARB/TK-LS/KARDZ");
  });
  it('stroke should be XXX when the word cannot be found', () => {
    expect(getStrokeForCurrentSlideContent("Not a real word", sourceMaterial)).toEqual("XXX");
  });
});
