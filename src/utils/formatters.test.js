import {
  durationFormatter,
  humanDurationFormatter
} from './formatters';

describe('durationFormatter', () => {
  it('returns short stopwatch formatted string showing zero-padded minutes, zero-padded seconds, for zero milliseconds', () => {
    const duration = 0;
    expect(durationFormatter(duration)).toEqual("00:00");
  });

  it('returns short stopwatch formatted string showing zero-padded minutes, zero-padded seconds, for 999 milliseconds', () => {
    const duration = 999
    expect(durationFormatter(duration)).toEqual("00:00");
  });

  it('returns stopwatch formatted string showing zero-padded minutes and seconds, for exactly 1 second', () => {
    const duration = 1000;
    expect(durationFormatter(duration)).toEqual("00:01");
  });

  it('returns stopwatch formatted string showing zero-padded minutes and seconds, for a nearly 2 seconds', () => {
    const duration = 1999;
    expect(durationFormatter(duration)).toEqual("00:01");
  });

  it('returns stopwatch formatted string showing zero-padded minutes and seconds, for a nearly 1 minute', () => {
    const duration = 59999;
    expect(durationFormatter(duration)).toEqual("00:59");
  });

  it('returns stopwatch formatted string showing zero-padded minutes and seconds, for exactly 1 minute', () => {
    const duration = 60000;
    expect(durationFormatter(duration)).toEqual("01:00");
  });

  it('returns stopwatch formatted string showing minutes and seconds, for under 1 hour', () => {
    const duration = 3599999;
    expect(durationFormatter(duration)).toEqual("59:59");
  });

  it('returns stopwatch formatted string showing zero-padded hours, minutes, and seconds, for exactly 1 hour', () => {
    const duration = 3600000;
    expect(durationFormatter(duration)).toEqual("01:00:00");
  });

  it('returns stopwatch formatted string showing zero-padded hours, minutes, seconds, for over 2 hours', () => {
    const duration = 7307000;
    expect(durationFormatter(duration)).toEqual("02:01:47");
  });

  it('returns stopwatch formatted string showing zero-padded hours, minutes, seconds, for up to 9 hours, 59 min, 59 seconds, 999 milliseconds', () => {
    const duration = 35999999;
    expect(durationFormatter(duration)).toEqual("09:59:59");
  });

  it('returns a custom string for more than 9 hours, 59 min, 59 seconds, 999 milliseconds', () => {
    const duration = 36000000;
    expect(durationFormatter(duration)).toEqual("10+ hours");
  });
});

describe('humanDurationFormatter', () => {
  it('returns human friendly formatted string showing less than a second', () => {
    const duration = 0;
    expect(humanDurationFormatter(duration)).toEqual("<1 min");
  });

  it('returns human friendly formatted string showing less than a minute', () => {
    const duration = 0.2;
    expect(humanDurationFormatter(duration)).toEqual("<1 min");
  });

  it('returns human friendly formatted string showing between 1 and 2 minutes', () => {
    const duration = 1.7;
    expect(humanDurationFormatter(duration)).toEqual("~1 min");
  });

  it('returns human friendly formatted string showing between 2 and 3 minutes', () => {
    const duration = 2.5;
    expect(humanDurationFormatter(duration)).toEqual("~2 min");
  });

  it('returns human friendly formatted string showing between 1 and 2 hours', () => {
    const duration = 61;
    expect(humanDurationFormatter(duration)).toEqual("~1 hr 1 min");
  });

  it('returns human friendly formatted string showing between 2 and 10 hours', () => {
    const duration = 120;
    expect(humanDurationFormatter(duration)).toEqual("~2 hr 0 min");
  });

  it('returns human friendly formatted string more than 10 hours', () => {
    const duration = 600;
    expect(humanDurationFormatter(duration)).toEqual("10+ hours");
  });
});
