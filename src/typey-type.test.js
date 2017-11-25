// import React from 'react';
// import ReactDOM from 'react-dom';
import { matchSplitText } from './typey-type';

describe('matchSplitText', () => {
  const settings={ignoredChars: ''};
  const userSettings={};

  it('splits typed text into matching and not matching text for partially matching typed text with a misstroke', () => {
    const expectedText = "and";
    const actualText = "ant";
    const expected = ["an", "d", "an", "t"];
    expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
  });

  it('splits typed text into matching and not matching text for typed text that matches so far but is not finished', () => {
    const expectedText = "and";
    const actualText = "an";
    const expected = ["an", "d", "an", ""];
    expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
  });

  it('splits typed text into matching and not matching text for a misstroke', () => {
    const expectedText = "and";
    const actualText = "the";
    const expected = ["", "and", "", "the"];
    expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
  });

  it('splits typed text into matching and not matching text for perfectly stroked text', () => {
    const expectedText = "and";
    const actualText = "and";
    const expected = ["and", "", "and", ""];
    expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
  });

  it('splits typed text into matching and not matching text for correctly stroked text with incorrect capitalisation', () => {
    const expectedText = "and";
    const actualText = "And";
    const expected = ["and", "", "And", ""];
    expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
  });

  it('splits typed text into matching and not matching text for multi-word text', () => {
    const expectedText = "as well as";
    const actualText = "as well as";
    const expected = ["as well as", "", "as well as", ""];
    expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
  });
  // return [matchedExpected, unmatchedExpected, matchedActual, unmatchedActual];
});
