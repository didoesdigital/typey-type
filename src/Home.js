import React from 'react';
import Lesson from './Lesson';
import { isFirstVisit } from './typey-type';

const Home = ( props ) => {
  if (isFirstVisit()) {
    return (
      <div>
        <h3 className='p3 pb0'>Welcome to Typey type for stenographers</h3>
        <Lesson
          {...props}
          />
      </div>
    )
  } else {
    return (
      <div>
        <Lesson
          {...props}
          />
      </div>
    )
  }
}

export default Home;
