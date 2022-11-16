import {
  increaseMetWords,
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
