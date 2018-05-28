import { chooseFlashcardsToShow } from './Flashcards';

describe('chooseFlashcardsToShow', () => {
  describe('for words you have never seen when revising recent mistakes', () => {
    let state = {
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
    let state = {
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
    let state = {
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
    let state = {
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

