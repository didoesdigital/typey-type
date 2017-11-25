// import React from 'react';
// import ReactDOM from 'react-dom';
import { sortLessons } from './utils';

describe('sortLessons', () => {
  const a = {
    "title": "The Longest Words",
    "subtitle": "",
    "category": "Drills",
    "subcategory": "Longest Words",
    "path": "./lessons/drills/longest-words/lesson.txt"
  }, b = {
    "title": "Common words",
    "subtitle": "",
    "category": "Drills",
    "subcategory": "Common Words",
    "path": "./lessons/drills/common-words/lesson.txt"
  }, c = {
    "title": "A good word",
    "subtitle": "",
    "category": "Drills",
    "subcategory": "A Good Word",
    "path": "./lessons/drills/common-words/lesson.txt"
  };

  it('sorts lesson by title alphabetically where a is first', () => {
    expect(sortLessons(a, b, "Words")).toEqual(12-7);
  });

  it('sorts lesson by title alphabetically where b is first', () => {
    expect(sortLessons(b, a, "Words")).toEqual(7-12);
  });
  it('sorts lesson by title alphabetically where the query is at the same position', () => {
    expect(sortLessons(b, c, "Word")).toEqual(1);
  });
});
