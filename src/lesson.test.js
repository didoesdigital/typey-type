import Lesson from './lesson';

describe('Lesson', () => {

  it('works', () => {
  });

  describe('Initialisation', () => {
    let lessonSource = ['one','two','three'];

    it('sets initial properties', () => {
      let lesson = new Lesson(lessonSource);
      expect(lesson.getCompletedPhrases()).toEqual([]);
      expect(lesson.getCurrentPhrase()).toEqual('one');
      expect(lesson.getRemainingPhrases()).toEqual(['two', 'three']);
    });

    it('does not mutate source', () => {
      expect(lessonSource).toEqual(['one','two','three']);
    });
  });

  describe('Traversal', () => {
    it('next', () => {
      let lesson = new Lesson(['one','two','three']);
      lesson.visitNextPhrase();
      expect(lesson.getCompletedPhrases()).toEqual(['one']);
      expect(lesson.getCurrentPhrase()).toEqual('two');
      expect(lesson.getRemainingPhrases()).toEqual(['three']);
    });
  });
});

