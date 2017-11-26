import Lesson from './lesson';

describe('Lesson', () => {

  it('works', () => {
  });

  describe('initialisation', () => {
    let lessonSource = ['one', 'two', 'three'];

    it('sets initial properties', () => {
      let lesson = new Lesson(lessonSource);
      expect(lesson.getCompletedPhrases()).toEqual([]);
      expect(lesson.getCurrentPhrase()).toEqual('one');
      expect(lesson.getRemainingPhrases()).toEqual(['two', 'three']);
    });

    it('does not mutate source', () => {
      expect(lessonSource).toEqual(['one', 'two', 'three']);
    });
  });

  describe('when visiting next phrase', () => {
    it('updates the properties', () => {
      let lesson = new Lesson(['one', 'two', 'three']);
      lesson.visitNextPhrase();
      expect(lesson.getCompletedPhrases()).toEqual(['one']);
      expect(lesson.getCurrentPhrase()).toEqual('two');
      expect(lesson.getRemainingPhrases()).toEqual(['three']);
    });

    describe('when end of lesson', () => {
      it('does not navigate past end of lesson', () => {
        let lesson = new Lesson(['one','two','three']);
        lesson.visitNextPhrase();
        lesson.visitNextPhrase();
        expect(lesson.getCompletedPhrases()).toEqual(['one', 'two']);
        expect(lesson.getCurrentPhrase()).toEqual('three');
        expect(lesson.getRemainingPhrases()).toEqual([]);
        lesson.visitNextPhrase();
        expect(lesson.getCompletedPhrases()).toEqual(['one', 'two']);
        expect(lesson.getCurrentPhrase()).toEqual('three');
        expect(lesson.getRemainingPhrases()).toEqual([]);
      });
    });
  });
});

