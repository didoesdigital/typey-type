import {
  increaseMetWords,
  filterByFamiliarity,
  replaceSmartTypographyInPresentedMaterial,
  sortLesson
} from './App';

it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
});

describe('increaseMetWords', () => {
  describe('meetingsCount is 0', () => {
    const state = {
      totalNumberOfNewWordsMet: 0,
    };
    it('increments total number of new words met', () => {
      expect(increaseMetWords.call({state: state}, 0)).toEqual({totalNumberOfNewWordsMet: 1});
    });
  });
  describe('meetingsCount is between 1 and 29 (inclusive)', () => {
    const state = {
      totalNumberOfLowExposuresSeen: 3,
    };
    it('increments total number of new words met from 3', () => {
      expect(increaseMetWords.call({state: state}, 3)).toEqual({totalNumberOfLowExposuresSeen: 4});
    });
  });
  describe('meetingsCount is 30 or higher', () => {
    const state = {
      totalNumberOfRetainedWords: 30,
    };
    it('increments total number of new words met from 3', () => {
      expect(increaseMetWords.call({state: state}, 30)).toEqual({totalNumberOfRetainedWords: 31});
    });
  });
});

describe('sortLesson', () => {
  describe('spaces', () => {
    const metWords = {
      " at":14,
      " her":10,
      " sounds":14
    };
    let presentedMaterial;
    beforeEach(() => {
      presentedMaterial = [
        {phrase: 'her', stroke: 'HER'},
        {phrase: 'at', stroke: 'AT'},
        {phrase: 'sounds', stroke: 'SOUPBDZ'}
      ]
    });

    describe('when settings sort by old', () => {
      const userSettings = {
        sortOrder: 'sortOld',
        spacePlacement: 'spaceBeforeOutput'
      };
      it('should present material by oldest met brief first', () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual(
          [
            {phrase: 'at', stroke: 'AT'},
            {phrase: 'sounds', stroke: 'SOUPBDZ'},
            {phrase: 'her', stroke: 'HER'}
          ]
        );
      });
    });
    describe('when settings sort by newest met brief first', () => {
      const userSettings = {
        sortOrder: 'sortNew',
        spacePlacement: 'spaceBeforeOutput'
      };
      it('should present material by newest met brief first', () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual(
          [
            {phrase: 'her', stroke: 'HER'},
            {phrase: 'sounds', stroke: 'SOUPBDZ'},
            {phrase: 'at', stroke: 'AT'}
          ]
        );
      });
    });
  });

  describe('no spaces', () => {
    const metWords = {
      "the":30,
      "of":1
    };
    let presentedMaterial;
    beforeEach(() => {
      presentedMaterial = [
        {phrase: 'the', stroke: '-T'},
        {phrase: 'of', stroke: '-F'},
        {phrase: 'and', stroke: 'SKP'}
      ]
    });

    describe('when settings sort by random', () => {
      const userSettings = {
        sortOrder: 'sortRandom'
      };
      it('should present material in a randomised order', () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).not.toEqual(
          [
            {phrase: 'the', stroke: '-T'},
            {phrase: 'of', stroke: '-F'},
            {phrase: 'and', stroke: 'SKP'}
          ]
        );
      });
    });
    describe('when settings sort by old', () => {
      const userSettings = {
        sortOrder: 'sortOld'
      };
      it('should present material by oldest met brief first', () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual(
          [
            {phrase: 'the', stroke: '-T'},
            {phrase: 'of', stroke: '-F'},
            {phrase: 'and', stroke: 'SKP'}
          ]
        );
      });
    });
    describe('when settings sort by newest met brief first', () => {
      const userSettings = {
        sortOrder: 'sortNew'
      };
      it('should present material by newest met brief first', () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual(
          [
            {phrase: 'and', stroke: 'SKP'},
            {phrase: 'of', stroke: '-F'},
            {phrase: 'the', stroke: '-T'}
          ]
        );
      });
    });
    describe('when settings sort off, by natural lesson order', () => {
      const userSettings = {
        sortOrder: 'sortOff'
      };
      it('should present material in order', () => {
        expect(sortLesson(presentedMaterial, metWords, userSettings)).toEqual(
          [
            {phrase: 'the', stroke: '-T'},
            {phrase: 'of', stroke: '-F'},
            {phrase: 'and', stroke: 'SKP'}
          ]
        );
      });
    });
  });
});

describe('filterByFamiliarity', () => {
  const presentedMaterial = [
    {phrase: 'the', stroke: '-T'},
    {phrase: 'of', stroke: '-F'},
    {phrase: 'and', stroke: 'SKP'}
  ],
  metWords = {
    " the":30,
    " of":1
  };
  const revisionMode = false;

  describe('when settings include showing new words for spaceBefore', () => {
    const userSettings = {
      spacePlacement: "spaceBeforeOutput",
      retainedWords: false,
      newWords: true,
      seenWords: false
    };
    it('should include new words in returned presented material', () => {
      expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

  describe('when settings include showing seen words with few exposures for spaceBefore', () => {
    const userSettings = {
      spacePlacement: "spaceBeforeOutput",
      retainedWords: false,
      newWords: false,
      seenWords: true
    };
    it('should include new words in returned presented material', () => {
      expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'of', stroke: '-F'}
        ]
      );
    });
  });

  describe('when settings include showing memorised, retained, familiar words for spaceBefore', () => {
    const userSettings = {
      spacePlacement: "spaceBeforeOutput",
      retainedWords: true,
      newWords: false,
      seenWords: false
    };
    it('should include new words in returned presented material', () => {
      expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'the', stroke: '-T'}
        ]
      );
    });
  });

  describe('when settings include all words of any familiarity level for spaceBefore', () => {
    const userSettings = {
      spacePlacement: "spaceBeforeOutput",
      retainedWords: true,
      newWords: true,
      seenWords: true
    };
    it('should include new words in returned presented material', () => {
      expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'the', stroke: '-T'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });
});

describe('filterByFamiliarity with different spacing settings', () => {
  const presentedMaterial = [
    {phrase: 'the', stroke: '-T'},
    {phrase: 'of', stroke: '-F'},
    {phrase: 'I', stroke: 'EU'},
    {phrase: 'be spoke', stroke: '-B/SPOEBG'},
    {phrase: 'bespoke', stroke: 'PWE/SPOEBG'},
    {phrase: 'and', stroke: 'SKP'}
  ];

  let metWords = {
    " the":30,
    " of":1,
    " I":1,
    " be spoke":1,
    " bespoke":1,

    "the ":1,
    "of ":30,
    "I ":1,
    "be spoke ":1,
    "bespoke ":1,

    "the":1,
    "of":1,
    "I":30,
    "be spoke":1,
    "bespoke":1,

    "bes poke":1,
  };
  const revisionMode = false;

  describe('when spaceOff ignores spaces and new words selected', () => {
    let metWords = { " the":1, " of":1, " I":1, " be spoke":1, " bespoke":1, "the ":1, "of ":1, "I ":1, "be spoke ":1, "bespoke ":1, "the":1, "of":1, "I":1, "be spoke":1, "bespoke":1, "bes poke":1, };
    let userSettings = { spacePlacement: "spaceOff", newWords: true, seenWords: false, retainedWords: false };
    it('should include only new words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

  describe('when spaceOff ignores spaces and seen words selected', () => {
    let metWords = { " the":0, " of":1, " I":0, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":0, "be spoke ":0, "bespoke ":0, "the":0, "of":0, "I":1, "be spoke":0, "bespoke":0, "bes poke":1, };
    let userSettings = { spacePlacement: "spaceOff", newWords: false, seenWords: true, retainedWords: false };
    it('should include only seen words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'of', stroke: '-F'},
          {phrase: 'I', stroke: 'EU'},
          {phrase: 'be spoke', stroke: '-B/SPOEBG'},
          {phrase: 'bespoke', stroke: 'PWE/SPOEBG'}
        ]
      );
    });
  });

  describe('when spaceOff ignores spaces and memorised words selected', () => {
    let metWords = { " the":30, " of":1, " I":10, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":10, "be spoke ":0, "bespoke ":0, "the":0, "of":30, "I":10, "be spoke":0, "bespoke":0, "bes poke":30, };
    let userSettings = { spacePlacement: "spaceOff", newWords: false, seenWords: false, retainedWords: true };
    it('should include only memorised words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'the', stroke: '-T'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'I', stroke: 'EU'},
          {phrase: 'be spoke', stroke: '-B/SPOEBG'},
          {phrase: 'bespoke', stroke: 'PWE/SPOEBG'}
        ]
      );
    });
  });

  describe('when spaceOff ignores spaces and ALL words selected', () => {
    let metWords = { " the":30, " of":1, " I":10, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":10, "be spoke ":0, "bespoke ":0, "the":0, "of":30, "I":10, "be spoke":0, "bespoke":0, "bes poke":30, };
    let userSettings = { spacePlacement: "spaceOff", newWords: true, seenWords: true, retainedWords: true };
    it('should include all words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'the', stroke: '-T'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'I', stroke: 'EU'},
          {phrase: 'be spoke', stroke: '-B/SPOEBG'},
          {phrase: 'bespoke', stroke: 'PWE/SPOEBG'},
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

  describe('when spaceExact ignores spaces and new words selected', () => {
    let metWords = { " the":1, " of":1, " I":30, " be spoke":1, " bespoke":1, "the ":1, "of ":1, "I ":30, "be spoke ":1, "bespoke ":1, "the":0, "of":1, "I":0, "be spoke":0, "bespoke":1, "bes poke":1, };
    let userSettings = { spacePlacement: "spaceExact", newWords: true, seenWords: false, retainedWords: false };
    it('should include only new words with any external spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

  describe('when spaceExact ignores spaces and seen words selected', () => {
    let metWords = { " the":0, " of":1, " I":0, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":0, "be spoke ":0, "bespoke ":0, "the":0, "of":0, "I":1, "be spoke":0, "bespoke":0, "bes poke":1, };
    let userSettings = { spacePlacement: "spaceExact", newWords: false, seenWords: true, retainedWords: false };
    it('should include only seen words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'of', stroke: '-F'},
          {phrase: 'I', stroke: 'EU'}
        ]
      );
    });
  });

  describe('when spaceExact ignores spaces and memorised words selected', () => {
    let metWords = { " the":30, " of":1, " I":10, " be spoke":29, " bespoke":0, "the ":0, "of ":1, "I ":10, "be spoke ":0, "bespoke ":29, "the":0, "of":30, "I":10, "be spoke":0, "bespoke":1, "bes poke":30, };
    let userSettings = { spacePlacement: "spaceExact", newWords: false, seenWords: false, retainedWords: true };
    it('should include only memorised words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
      // be spoke
        [
          {phrase: 'the', stroke: '-T'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'I', stroke: 'EU'},
          {phrase: 'bespoke', stroke: 'PWE/SPOEBG'}
        ]
      );
    });
  });

  describe('when spaceExact ignores spaces and ALL words selected', () => {
    let metWords = { " the":30, " of":1, " I":10, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":10, "be spoke ":0, "bespoke ":0, "the":0, "of":30, "I":10, "be spoke":0, "bespoke":0, "bes poke":30, };
    let userSettings = { spacePlacement: "spaceExact", newWords: true, seenWords: true, retainedWords: true };
    it('should include all words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
        {phrase: 'the', stroke: '-T'},
        {phrase: 'of', stroke: '-F'},
        {phrase: 'I', stroke: 'EU'},
        {phrase: 'be spoke', stroke: '-B/SPOEBG'},
        {phrase: 'bespoke', stroke: 'PWE/SPOEBG'},
        {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

  describe('when spaceBeforeOutput ignores spaces and new words selected', () => {
    let metWords = { " the":1, " of":1, " I":1, " be spoke":1, " bespoke":1, "the ":1, "of ":1, "I ":1, "be spoke ":1, "bespoke ":1, "the":1, "of":1, "I":1, "be spoke":1, "bespoke":1, "bes poke":1, };
    let userSettings = { spacePlacement: "spaceBeforeOutput", newWords: true, seenWords: false, retainedWords: false };
    it('should include only new words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

  describe('when spaceBeforeOutput ignores spaces and seen words selected', () => {
    let metWords = { " the":0, " of":1, " I":0, " be spoke":1, " bespoke":0, "the ":0, "of ":1, "I ":0, "be spoke ":0, "bespoke ":0, "the":0, "of":0, "I":1, "be spoke":0, "bespoke":0, "bes poke":1, };
    let userSettings = { spacePlacement: "spaceBeforeOutput", newWords: false, seenWords: true, retainedWords: false };
    it('should include only seen words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'of', stroke: '-F'},
          {phrase: 'be spoke', stroke: '-B/SPOEBG'}
        ]
      );
    });
  });

  describe('when spaceBeforeOutput ignores spaces and memorised words selected', () => {
    let metWords = { " the":30, " of":1, " I":10, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":10, "be spoke ":0, "bespoke ":0, "the":0, "of":30, "I":10, "be spoke":0, "bespoke":0, "bes poke":30, };
    let userSettings = { spacePlacement: "spaceBeforeOutput", newWords: false, seenWords: false, retainedWords: true };
    it('should include only memorised words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'the', stroke: '-T'}
        ]
      );
    });
  });

  describe('when spaceBeforeOutput ignores spaces and ALL words selected', () => {
    let metWords = { " the":30, " of":1, " I":10, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":10, "be spoke ":0, "bespoke ":0, "the":0, "of":30, "I":10, "be spoke":0, "bespoke":0, "bes poke":30, };
    let userSettings = { spacePlacement: "spaceBeforeOutput", newWords: true, seenWords: true, retainedWords: true };
    it('should include all words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
        {phrase: 'the', stroke: '-T'},
        {phrase: 'of', stroke: '-F'},
        {phrase: 'I', stroke: 'EU'},
        {phrase: 'be spoke', stroke: '-B/SPOEBG'},
        {phrase: 'bespoke', stroke: 'PWE/SPOEBG'},
        {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

  describe('when spaceAfterOutput ignores spaces and new words selected', () => {
    let metWords = { " the":1, " of":1, " I":1, " be spoke":1, " bespoke":1, "the ":1, "of ":1, "I ":1, "be spoke ":1, "bespoke ":1, "the":1, "of":1, "I":1, "be spoke":1, "bespoke":1, "bes poke":1, };
    let userSettings = { spacePlacement: "spaceAfterOutput", newWords: true, seenWords: false, retainedWords: false };
    it('should include only new words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

  describe('when spaceAfterOutput ignores spaces and seen words selected', () => {
    let metWords = { " the":0, " of":1, " I":0, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":0, "be spoke ":0, "bespoke ":0, "the":0, "of":0, "I":1, "be spoke":0, "bespoke":0, "bes poke":1, };
    let userSettings = { spacePlacement: "spaceAfterOutput", newWords: false, seenWords: true, retainedWords: false };
    it('should include only seen words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
          {phrase: 'of', stroke: '-F'}
        ]
      );
    });
  });

  describe('when spaceAfterOutput ignores spaces and memorised words selected', () => {
    let metWords = { " the":30, " of":1, " I":10, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":10, "be spoke ":0, "bespoke ":0, "the":0, "of":30, "I":10, "be spoke":0, "bespoke":0, "bes poke":30, };
    let userSettings = { spacePlacement: "spaceAfterOutput", newWords: false, seenWords: false, retainedWords: true };
    it('should include only memorised words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
        ]
      );
    });
  });

  describe('when spaceAfterOutput ignores spaces and ALL words selected', () => {
    let metWords = { " the":30, " of":1, " I":10, " be spoke":0, " bespoke":0, "the ":0, "of ":1, "I ":10, "be spoke ":0, "bespoke ":0, "the":0, "of":30, "I":10, "be spoke":0, "bespoke":0, "bes poke":30, };
    let userSettings = { spacePlacement: "spaceAfterOutput", newWords: true, seenWords: true, retainedWords: true };
    it('should include all words with any spacing in returned presented material', () => { expect(filterByFamiliarity(presentedMaterial, metWords, userSettings, revisionMode)).toEqual(
        [
        {phrase: 'the', stroke: '-T'},
        {phrase: 'of', stroke: '-F'},
        {phrase: 'I', stroke: 'EU'},
        {phrase: 'be spoke', stroke: '-B/SPOEBG'},
        {phrase: 'bespoke', stroke: 'PWE/SPOEBG'},
        {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });

});

describe('replaceSmartTypographyInPresentedMaterial with typography', () => {
  let presentedMaterial;
  beforeEach(() => {
    presentedMaterial = [
      {phrase: 'madness—a', stroke: 'PHAD/-PBS EPL/TKA*RB AEU'}, // em dash in a string
      {phrase: '—', stroke: 'PH-RB'}, // em dash
      {phrase: '–', stroke: 'TPH-RB'}, // en dash
      {phrase: '‑', stroke: 'XXX'}, // non-breaking hyphen
      {phrase: '᠆', stroke: 'XXX'}, // mongolian todo soft hyphen
      {phrase: '⹀', stroke: 'XXX'}, // double hyphen
      {phrase: '…', stroke: 'SKWR-RBGSZ'},
      {phrase: '“', stroke: 'KW-GS'},
      {phrase: '”', stroke: 'KR-GS'},
      {phrase: '‘', stroke: 'TP-P'},
      {phrase: '’', stroke: 'TP-L'}
    ];
  });

  describe('has fancy typography', () => {
    let userSettings = {
      simpleTypography: false
    }

    it('should return a lesson with smart typography', () => {
      expect(replaceSmartTypographyInPresentedMaterial(presentedMaterial, userSettings)).toEqual(
        [
          {phrase: 'madness—a', stroke: 'PHAD/-PBS EPL/TKA*RB AEU'}, // em dash in a string
          {phrase: '—', stroke: 'PH-RB'}, // em dash
          {phrase: '–', stroke: 'TPH-RB'}, // en dash
          {phrase: '‑', stroke: 'XXX'}, // non-breaking hyphen
          {phrase: '᠆', stroke: 'XXX'}, // mongolian todo soft hyphen
          {phrase: '⹀', stroke: 'XXX'}, // double hyphen
          {phrase: '…', stroke: 'SKWR-RBGSZ'},
          {phrase: '“', stroke: 'KW-GS'},
          {phrase: '”', stroke: 'KR-GS'},
          {phrase: '‘', stroke: 'TP-P'},
          {phrase: '’', stroke: 'TP-L'}
        ]
      );
    });
  });

  describe('has simple typography', () => {
    let userSettings = {
      simpleTypography: true
    }

    it('should return a lesson with dumb typography', () => {
      expect(replaceSmartTypographyInPresentedMaterial(presentedMaterial, userSettings)).toEqual(
        [
          {phrase: 'madness-a', stroke: 'PHAD/-PBS H-PB AEU'},
          {phrase: '-', stroke: 'H-PB'},
          {phrase: '-', stroke: 'H-PB'},
          {phrase: '-', stroke: 'H-PB'},
          {phrase: '-', stroke: 'H-PB'},
          {phrase: '-', stroke: 'H-PB'},
          {phrase: '...', stroke: 'HR-PS'},
          {phrase: '"', stroke: 'KW-GS'},
          {phrase: '"', stroke: 'KR-GS'},
          {phrase: "'", stroke: 'AE'},
          {phrase: "'", stroke: 'AE'}
        ]
      );
    });
  });
});
