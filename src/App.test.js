import React from 'react';
import ReactDOM from 'react-dom';
import { increaseMetWords, filterByFamiliarity } from './App';

it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
});

describe('increaseMetWords', () => {
  describe('meetingsCount is 0', () => {
    const state = {
      totalNumberOfNewWordsMet: 0,
      currentPhraseMeetingSuccess: 1
    };
    it('increments total number of new words met', () => {
      expect(increaseMetWords.call({state: state}, 0)).toEqual({totalNumberOfNewWordsMet: 1});
    });
  });
  describe('meetingsCount is between 1 and 29 (inclusive)', () => {
    const state = {
      totalNumberOfLowExposuresSeen: 3,
      currentPhraseMeetingSuccess: 1
    };
    it('increments total number of new words met from 3', () => {
      expect(increaseMetWords.call({state: state}, 3)).toEqual({totalNumberOfLowExposuresSeen: 4});
    });
  });
  describe('meetingsCount is 30 or higher', () => {
    const state = {
      totalNumberOfRetainedWords: 30,
      currentPhraseMeetingSuccess: 1
    };
    it('increments total number of new words met from 3', () => {
      expect(increaseMetWords.call({state: state}, 30)).toEqual({totalNumberOfRetainedWords: 31});
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
    "the":30,
    "of":1
  };

  describe('when settings include showing new words', () => {
    const userSettings = {
      retainedWords: false,
      newWords: true,
      seenWords: false
    };
    it('should include new words in returned presented material', () => {
      expect(filterByFamiliarity.call({userSettings: userSettings}, presentedMaterial, metWords, userSettings)).toEqual(
        [
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });
  describe('when settings include showing seen words with few exposures', () => {
    const userSettings = {
      retainedWords: false,
      newWords: false,
      seenWords: true
    };
    it('should include new words in returned presented material', () => {
      expect(filterByFamiliarity.call({userSettings: userSettings}, presentedMaterial, metWords, userSettings)).toEqual(
        [
          {phrase: 'of', stroke: '-F'}
        ]
      );
    });
  });
  describe('when settings include showing memorised, retained, familiar words', () => {
    const userSettings = {
      retainedWords: true,
      newWords: false,
      seenWords: false
    };
    it('should include new words in returned presented material', () => {
      expect(filterByFamiliarity.call({userSettings: userSettings}, presentedMaterial, metWords, userSettings)).toEqual(
        [
          {phrase: 'the', stroke: '-T'}
        ]
      );
    });
  });
  describe('when settings include all words of any familiarity level', () => {
    const userSettings = {
      retainedWords: true,
      newWords: true,
      seenWords: true
    };
    it('should include new words in returned presented material', () => {
      expect(filterByFamiliarity.call({userSettings: userSettings}, presentedMaterial, metWords, userSettings)).toEqual(
        [
          {phrase: 'the', stroke: '-T'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'and', stroke: 'SKP'}
        ]
      );
    });
  });
});
