// import React from 'react';
// import ReactDOM from 'react-dom';
import { matchSplitText } from './typey-type';

describe('matchSplitText', () => {
  const expectedText = "and";
  const actualText = "an";
  const settings={ignoredChars: ''};
  const userSettings={};

  it('splits provided text into matching and not matching text', () => {
    const expected = ["an", "d", "an", ""];
    expect(matchSplitText(expectedText, actualText, settings, userSettings)).toEqual(expect.arrayContaining(expected));
  });
});
