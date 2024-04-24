const HASH = 0b00000000000000000000001;
const S    = 0b00000000000000000000010;
const T    = 0b00000000000000000000100;
const K    = 0b00000000000000000001000;
const P    = 0b00000000000000000010000;
const W    = 0b00000000000000000100000;
const H    = 0b00000000000000001000000;
const R    = 0b00000000000000010000000;
const A    = 0b00000000000000100000000;
const O    = 0b00000000000001000000000;
const STAR = 0b00000000000010000000000;
const E    = 0b00000000000100000000000;
const U    = 0b00000000001000000000000;
const F    = 0b00000000010000000000000;
const RR   = 0b00000000100000000000000;
const RP   = 0b00000001000000000000000;
const B    = 0b00000010000000000000000;
const L    = 0b00000100000000000000000;
const G    = 0b00001000000000000000000;
const RT   = 0b00010000000000000000000;
const RS   = 0b00100000000000000000000;
const D    = 0b01000000000000000000000;
const Z    = 0b10000000000000000000000;

// const LEFT = S | T | K | P | W | H | R | A | O;
// const LEFT = 0b00000000000001111111110;
// const AMBIGUOUS_RIGHT_KEYS = RS | RT | RP | RR;
const VOWELS_AND_STAR = A | O | STAR | E | U;
const RIGHT_KEYS = F | RR | RP | B | L | G | RT | RS | D | Z;

class Stroke {
  constructor(bits = 0) {
    this.bits = bits;
  }

  /** @param key { number } e.g. `2` or two in hex: `0b00000000000000000000010` for the left S key or `16384` for the right R key (`RR`) */
  set(key) {
    return new Stroke(this.bits | key);
  }

  toString() {
    let raw = [];

    if (this.bits & HASH) {
      raw.push('#')
    }
    if (this.bits & S) {
      raw.push('S')
    }
    if (this.bits & T) {
      raw.push('T')
    }
    if (this.bits & K) {
      raw.push('K')
    }
    if (this.bits & P) {
      raw.push('P')
    }
    if (this.bits & W) {
      raw.push('W')
    }
    if (this.bits & H) {
      raw.push('H')
    }
    if (this.bits & R) {
      raw.push('R')
    }
    if (this.bits & A) {
      raw.push('A')
    }
    if (this.bits & O) {
      raw.push('O')
    }
    if (this.bits & STAR) {
      raw.push('*')
    }
    if (this.requiresDisambiguation()) {
      raw.push('-')
    }
    if (this.bits & E) {
      raw.push('E')
    }
    if (this.bits & U) {
      raw.push('U')
    }
    if (this.bits & F) {
      raw.push('F')
    }
    if (this.bits & RR) {
      raw.push('R')
    }
    if (this.bits & RP) {
      raw.push('P')
    }
    if (this.bits & B) {
      raw.push('B')
    }
    if (this.bits & L) {
      raw.push('L')
    }
    if (this.bits & G) {
      raw.push('G')
    }
    if (this.bits & RT) {
      raw.push('T')
    }
    if (this.bits & RS) {
      raw.push('S')
    }
    if (this.bits & D) {
      raw.push('D')
    }
    if (this.bits & Z) {
      raw.push('Z')
    }

    return raw.join('');
  }

  requiresDisambiguation() {
    return (this.bits & RIGHT_KEYS) !== 0 && (this.bits & VOWELS_AND_STAR) === 0;
  }
}

export default Stroke;
export {
HASH,
S,
T,
K,
P,
W,
H,
R,
A,
O,
STAR,
E,
U,
F,
RR,
RP,
B,
L,
G,
RT,
RS,
D,
Z
};
