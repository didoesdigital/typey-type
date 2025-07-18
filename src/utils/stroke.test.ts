import Stroke from './stroke';
import strokeBits from './strokeBits';

describe('return a string representing stroke', () => {
  describe('American left side, no vowel, no star', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.S);
      let stenoBrief = 'S';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American vowel, no star, F key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.E);
      stenoStroke = stenoStroke.set(strokeBits.F);
      let stenoBrief = 'EF';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American vowel, no star, unambiguous right-side key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.E);
      stenoStroke = stenoStroke.set(strokeBits.L);
      let stenoBrief = 'EL';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American vowel, no star, F key, ambiguous right-side key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.E);
      stenoStroke = stenoStroke.set(strokeBits.F);
      stenoStroke = stenoStroke.set(strokeBits.RR);
      let stenoBrief = 'EFR';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American vowel, no star, no F key, ambiguous right-side key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.U);
      stenoStroke = stenoStroke.set(strokeBits.RS);
      let stenoBrief = 'US';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side, no vowel, no star, F key', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.F);
      let stenoBrief = '-F';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side, no vowel, no star, F key, ambiguous right-side key', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.F);
      stenoStroke = stenoStroke.set(strokeBits.RR);
      let stenoBrief = '-FR';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side, no vowel, no star, F key, multiple ambiguous right-side keys', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.F);
      stenoStroke = stenoStroke.set(strokeBits.RP);
      stenoStroke = stenoStroke.set(strokeBits.L);
      stenoStroke = stenoStroke.set(strokeBits.RT);
      let stenoBrief = '-FPLT';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side, no vowel, no star, unambiguous right-side key', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.B);
      let stenoBrief = '-B';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side, no vowel, no star, ambiguous right-side key', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.RT);
      let stenoBrief = '-T';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });


  describe('American right-side vowel, star, no F key, ambiguous right-side key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.U);
      stenoStroke = stenoStroke.set(strokeBits.STAR);
      stenoStroke = stenoStroke.set(strokeBits.RS);
      let stenoBrief = '*US';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American left-side vowel, star, no F key, ambiguous right-side key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.A);
      stenoStroke = stenoStroke.set(strokeBits.STAR);
      stenoStroke = stenoStroke.set(strokeBits.RS);
      let stenoBrief = 'A*S';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side, no vowel, no star, F key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.STAR);
      stenoStroke = stenoStroke.set(strokeBits.F);
      let stenoBrief = '*F';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side, no vowel, no star, unambiguous right-side key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.STAR);
      stenoStroke = stenoStroke.set(strokeBits.B);
      let stenoBrief = '*B';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side, no vowel, no star, ambiguous right-side key', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.STAR);
      stenoStroke = stenoStroke.set(strokeBits.RT);
      let stenoBrief = '*T';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American both sides, vowel, no star', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.W);
      stenoStroke = stenoStroke.set(strokeBits.A);
      stenoStroke = stenoStroke.set(strokeBits.RS);
      let stenoBrief = 'WAS';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American skeleton stroke, both sides, ambiguous right-side key no vowel, no star', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.S);
      stenoStroke = stenoStroke.set(strokeBits.RT);
      let stenoBrief = 'S-T';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American skeleton stroke, both sides, ambiguous keys both sides, no vowel, no star', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.W);
      stenoStroke = stenoStroke.set(strokeBits.R);
      stenoStroke = stenoStroke.set(strokeBits.RR);
      let stenoBrief = 'WR-R';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American skeleton stroke, both sides, multiple ambiguous right-side keys, no vowel, no star', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.H);
      stenoStroke = stenoStroke.set(strokeBits.L);
      stenoStroke = stenoStroke.set(strokeBits.RT);
      stenoStroke = stenoStroke.set(strokeBits.RS);
      let stenoBrief = 'H-LTS';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American both sides, star, no vowel', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.S);
      stenoStroke = stenoStroke.set(strokeBits.STAR);
      stenoStroke = stenoStroke.set(strokeBits.RT);
      let stenoBrief = 'S*T';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American both sides, star, vowel', () => {
    it('should return stroke string without dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.W);
      stenoStroke = stenoStroke.set(strokeBits.R);
      stenoStroke = stenoStroke.set(strokeBits.A);
      stenoStroke = stenoStroke.set(strokeBits.STAR);
      stenoStroke = stenoStroke.set(strokeBits.RT);
      let stenoBrief = 'WRA*T';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American stroke with F and no vowels or star', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.H);
      stenoStroke = stenoStroke.set(strokeBits.R);
      stenoStroke = stenoStroke.set(strokeBits.F);
      let stenoBrief = 'HR-F';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American stroke with F, P, and no vowels or star', () => {
    it('should return stroke string with dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.H);
      stenoStroke = stenoStroke.set(strokeBits.R);
      stenoStroke = stenoStroke.set(strokeBits.F);
      stenoStroke = stenoStroke.set(strokeBits.RP);
      let stenoBrief = 'HR-FP';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American right side stroke, right vowel, with star, with F key', () => {
    it('should return stroke string …', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.STAR);
      stenoStroke = stenoStroke.set(strokeBits.E);
      stenoStroke = stenoStroke.set(strokeBits.F);
      stenoStroke = stenoStroke.set(strokeBits.RR);
      stenoStroke = stenoStroke.set(strokeBits.D);
      let stenoBrief = '*EFRD';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American number bar stroke with unambiguous right-side key', () => {
    it('should return stroke string with number bar and dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.HASH);
      stenoStroke = stenoStroke.set(strokeBits.Z);
      let stenoBrief = '#-Z';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American number bar stroke with ambiguous right-side key', () => {
    it('should return stroke string with number bar, no dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.HASH);
      stenoStroke = stenoStroke.set(strokeBits.RP);
      let stenoBrief = '#-P';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });

  describe('American number bar stroke with left-side key', () => {
    it('should return stroke string with number bar, no dash', () => {
      let stenoStroke = new Stroke();
      stenoStroke = stenoStroke.set(strokeBits.HASH);
      stenoStroke = stenoStroke.set(strokeBits.P);
      let stenoBrief = '#P';
      expect(stenoStroke.toString()).toEqual(stenoBrief);
    });
  });
});

