import {
  increaseMetWords,
  replaceSmartTypographyInPresentedMaterial,
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
