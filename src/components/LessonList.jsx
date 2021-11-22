import React from 'react';
import { Link } from 'react-router-dom';
import { groups } from 'd3-array';

const WordCount = ({lesson}) => lesson?.wordCount > 0 && ` · ${lesson.wordCount} words`
const LessonLink = ({lesson, url}) => <Link to={`${url}${lesson.path}`.replace(/lesson\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--lesson-index-'+lesson.path.replace(/\/lesson\.txt/g,'').replace(/[/.]/g,'-')}>{lesson.title}{lesson.subtitle?.length > 0 && `: ${lesson.subtitle}`}</Link>

export default function LessonList({ lessonIndex, url }) {
  const categories = groups(lessonIndex, d => d.category)
  return <div>
    <p className="mb0">Jump to:</p>
    <ul>
      {categories.map(([category, _]) => <li key={category}><a href={`#${category.toLowerCase()}`}>{category}</a></li>)}
    </ul>
    {categories.map(([category, lessons]) => (
      <div key={category}>
        <a href={`#${category.toLowerCase()}`} id={category.toLowerCase()} className="heading-link--content"><h4>{category}</h4></a>
        <ul className="unstyled-list">
          {lessons.map((lesson) =>
            <li className="unstyled-list-item mb1" key={ lesson.path }>
              <LessonLink lesson={lesson} url={url} /><WordCount lesson={lesson} />
            </li>
          )}
        </ul>
      </div>
    ))}
  </div>
}

