// import React from 'react';
// import ReactDOM from 'react-dom';
import { sortLessons } from './utils';

describe('sortLessons', () => {
  it('sorts lesson by title alphabetically', () => {
    const a = {
        "title": "Longest Words",
        "subtitle": "",
        "category": "Drills",
        "subcategory": "Longest Words",
        "path": "./lessons/drills/longest-words/lesson.txt"
      },
      b = {
        "title": "Common words",
        "subtitle": "",
        "category": "Drills",
        "subcategory": "Common Words",
        "path": "./lessons/drills/common-words/lesson.txt"
      },
      value = "Words";
    expect(sortLessons(a, b, value)).toEqual(1);
  });
});
