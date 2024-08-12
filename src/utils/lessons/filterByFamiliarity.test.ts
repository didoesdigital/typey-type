import filterByFamiliarity from './filterByFamiliarity';

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

  // let metWords = {
  //   " the":30,
  //   " of":1,
  //   " I":1,
  //   " be spoke":1,
  //   " bespoke":1,

  //   "the ":1,
  //   "of ":30,
  //   "I ":1,
  //   "be spoke ":1,
  //   "bespoke ":1,

  //   "the":1,
  //   "of":1,
  //   "I":30,
  //   "be spoke":1,
  //   "bespoke":1,

  //   "bes poke":1,
  // };
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

