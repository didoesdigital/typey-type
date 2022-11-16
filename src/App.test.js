import {
  increaseMetWords,
  replaceSmartTypographyInPresentedMaterial,
  sortLesson
} from './App';
import { mockRandomForEach } from 'jest-mock-random';

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
            {phrase: 'at', stroke: 'AT'},
            {phrase: 'sounds', stroke: 'SOUPBDZ'}
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
      mockRandomForEach(0.1);
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
      {phrase: '’', stroke: 'TP-L'},
      {phrase: 'æ', stroke: 'XXX'},
      {phrase: 'Æ', stroke: 'XXX'},
      {phrase: 'ë', stroke: 'XXX'}
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
          {phrase: '’', stroke: 'TP-L'},
          {phrase: 'æ', stroke: 'XXX'},
          {phrase: 'Æ', stroke: 'XXX'},
          {phrase: 'ë', stroke: 'XXX'}
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
          {phrase: "'", stroke: 'AE'},
          {phrase: "ae", stroke: 'A*/*E'},
          {phrase: "Ae", stroke: 'A*P/*E'},
          {phrase: "e", stroke: '*E'}
        ]
      );
    });
  });
});
