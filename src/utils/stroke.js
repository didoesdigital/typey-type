import strokeBits from "utils/strokeBits"

const {
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
  Z,
  VOWELS_AND_STAR,
  RIGHT_KEYS,
} = strokeBits;

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
