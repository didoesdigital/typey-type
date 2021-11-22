import React from 'react';
import { Link } from 'react-router-dom';

export default function LessonList({ lessonIndex, url }) {
  const linkList = lessonIndex.map( (lesson) => {
    let lessonsubtitle = '';
    let wordCount = 0;
    let wordCountInIndex = '';
    if (lesson.subtitle && lesson.subtitle.length > 0) {
      lessonsubtitle = ': '+lesson.subtitle;
    }
    if (lesson.wordCount && lesson.wordCount > 0) {
      wordCount = lesson.wordCount;
      wordCountInIndex = ' · ' + wordCount + ' words';
    }
    return(
      <li className="unstyled-list-item mb1" key={ lesson.path }>
        <Link to={`${url}${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--lesson-index-'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lessonsubtitle}</Link>{wordCountInIndex}
      </li>
    )
  });

  return <ul className="unstyled-list">{linkList}</ul>
}
