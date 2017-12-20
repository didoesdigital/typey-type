import React from 'react';
import Lesson from './Lesson';
import { isFirstVisit } from './typey-type';

const Home = ( props ) => {
  if (isFirstVisit()) {
    return (
      <div>
        <Lesson
          firstVisit="true"
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
