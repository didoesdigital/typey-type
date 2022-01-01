import {
  durationFormatter
} from './formatters';

describe('durationFormatter', () => {
  it('returns short stopwatch formatted string showing zero-padded minutes, zero-padded seconds, for zero milliseconds', () => {
    const duration = 0;
    expect(durationFormatter(duration)).toEqual("00:00");
  });
});

describe('durationFormatter', () => {
  it('returns short stopwatch formatted string showing zero-padded minutes, zero-padded seconds, for 999 milliseconds', () => {
    const duration = 999
    expect(durationFormatter(duration)).toEqual("00:00");
  });
});

describe('durationFormatter', () => {
  it('returns stopwatch formatted string showing zero-padded minutes and seconds, for exactly 1 second', () => {
    const duration = 1000;
    expect(durationFormatter(duration)).toEqual("00:01");
  });
});

describe('durationFormatter', () => {
  it('returns stopwatch formatted string showing zero-padded minutes and seconds, for a nearly 2 seconds', () => {
    const duration = 1999;
    expect(durationFormatter(duration)).toEqual("00:01");
  });
});

describe('durationFormatter', () => {
  it('returns stopwatch formatted string showing zero-padded minutes and seconds, for a nearly 1 minute', () => {
    const duration = 59999;
    expect(durationFormatter(duration)).toEqual("00:59");
  });
});

describe('durationFormatter', () => {
  it('returns stopwatch formatted string showing zero-padded minutes and seconds, for exactly 1 minute', () => {
    const duration = 60000;
    expect(durationFormatter(duration)).toEqual("01:00");
  });
});

describe('durationFormatter', () => {
  it('returns stopwatch formatted string showing minutes and seconds, for under 1 hour', () => {
    const duration = 3599999;
    expect(durationFormatter(duration)).toEqual("59:59");
  });
});

describe('durationFormatter', () => {
  it('returns stopwatch formatted string showing zero-padded hours, minutes, and seconds, for exactly 1 hour', () => {
    const duration = 3600000;
    expect(durationFormatter(duration)).toEqual("01:00:00");
  });
});

describe('durationFormatter', () => {
  it('returns stopwatch formatted string showing zero-padded hours, minutes, seconds, for over 2 hours', () => {
    const duration = 7307000;
    expect(durationFormatter(duration)).toEqual("02:01:47");
  });
});

describe('durationFormatter', () => {
  it('returns stopwatch formatted string showing zero-padded hours, minutes, seconds, for up to 9 hours, 59 min, 59 seconds, 999 milliseconds', () => {
    const duration = 35999999;
    expect(durationFormatter(duration)).toEqual("09:59:59");
  });
});

describe('durationFormatter', () => {
  it('returns a custom string for more than 9 hours, 59 min, 59 seconds, 999 milliseconds', () => {
    const duration = 36000000;
    expect(durationFormatter(duration)).toEqual("10+ hours");
  });
});

