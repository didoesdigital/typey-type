import React from 'react';
import Lesson from './Lesson';
import { isFirstVisit } from './typey-type';

const Home = ( props ) => {
  if (isFirstVisit()) {
    return (
      <div>
        <h2>Welcome to Typey type for stenographers</h2>
        <Lesson
          {...props}
          />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Welcome back</h2>
        <Lesson
          {...props}
          />
      </div>
    )
  }
}

export default Home;
