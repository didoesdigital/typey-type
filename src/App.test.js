import React from 'react';
import ReactDOM from 'react-dom';
import { increaseMetWords, filterByFamiliarity, sortLesson } from './App';

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
