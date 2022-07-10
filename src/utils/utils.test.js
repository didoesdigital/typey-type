// import React from 'react';
// import ReactDOM from 'react-dom';
import { relativeTimeAgo, isPeak } from './utils';

describe('relativeTimeAgo', () => {
  it('shows relative 0 minutes ago', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1558156382814;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("a moment");
  });

  it('shows relative 1 minute ago', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1558156322000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("1 minute");
  });

  it('shows relative 1 hour ago', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1558152782000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("1 hour");
  });

  it('shows relative 1 day ago', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1558069982000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("1 day");
  });

  it('shows relative 1 week ago', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1557551582000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("1 week");
  });

  it('shows relative 59 minutes ago', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1558152819000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("59 minutes");
  });

  it('shows relative time ago in minutes', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1558156202000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("3 minutes");
  });

  it('shows relative time ago in hours', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1558145582000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("3 hours");
  });

  it('shows relative time ago in days', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1557897182000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("3 days");
  });

  it('shows relative time ago in weeks', () => {
    let millisecondsNow = 1558156382814;
    let millisecondsTimeInThePast = 1556421182000;
    expect(relativeTimeAgo(millisecondsNow, millisecondsTimeInThePast)).toEqual("3 weeks");
  });
});

describe('isPeak', () => {
  it('returns true for peaks', () => {
    let previousItemLength = 2;
    let currentItemLength = 3;
    let nextItemLength = 2;
    expect(isPeak(currentItemLength, previousItemLength, nextItemLength)).toEqual(true);
  });

  it('returns false for slopes', () => {
    let previousItemLength = 4;
    let currentItemLength = 3;
    let nextItemLength = 2;
    expect(isPeak(currentItemLength, previousItemLength, nextItemLength)).toEqual(false);
  });

  it('returns false for valleys', () => {
    let previousItemLength = 4;
    let currentItemLength = 3;
    let nextItemLength = 4;
    expect(isPeak(currentItemLength, previousItemLength, nextItemLength)).toEqual(false);
  });
});
