import Zipper from './zipper';

describe('Zipper', () => {

  describe('initialisation', () => {
    let sourceItems = ['one', 'two', 'three'];

    it('sets initial properties', () => {
      let list = new Zipper(sourceItems);
      expect(list.getCompleted()).toEqual([]);
      expect(list.getCurrent()).toEqual('one');
      expect(list.getRemaining()).toEqual(['two', 'three']);
    });

    it('does not mutate source', () => {
      expect(sourceItems).toEqual(['one', 'two', 'three']);
    });
  });

  describe('when visiting next list item', () => {
    it('updates the properties', () => {
      let list = new Zipper(['one', 'two', 'three']);
      list.visitNext();
      expect(list.getCompleted()).toEqual(['one']);
      expect(list.getCurrent()).toEqual('two');
      expect(list.getRemaining()).toEqual(['three']);
    });

    describe('when end of list', () => {
      it('does not navigate past end of list', () => {
        let list = new Zipper(['one','two','three']);
        list.visitNext();
        list.visitNext();
        expect(list.getCompleted()).toEqual(['one', 'two']);
        expect(list.getCurrent()).toEqual('three');
        expect(list.getRemaining()).toEqual([]);
        list.visitNext();
        expect(list.getCompleted()).toEqual(['one', 'two']);
        expect(list.getCurrent()).toEqual('three');
        expect(list.getRemaining()).toEqual([]);
      });
    });
  });
});

