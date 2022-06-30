import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { groups } from "d3-array";

const WordCount = ({ lesson }) =>
  lesson?.wordCount > 0 && ` · ${lesson.wordCount} words`;

const LessonLink = ({ lesson, url }) => (
  <Link
    to={`${url}${lesson.path}`
      .replace(/lesson\.txt$/, "")
      .replace(/\/{2,}/g, "/")}
    id={
      "ga--lesson-index-" +
      lesson.path.replace(/\/lesson\.txt/g, "").replace(/[/.]/g, "-")
    }
  >
    {lesson.title}
    {lesson.subtitle?.length > 0 && `: ${lesson.subtitle}`}
  </Link>
);

const InnerLessonList = ({ lessons, url }) => (
  <ul className="unstyled-list">
    {lessons.map((lesson) => (
      <li className="unstyled-list-item mb1" key={lesson.path}>
        <LessonLink lesson={lesson} url={url} />
        <WordCount lesson={lesson} />
      </li>
    ))}
  </ul>
);

const wrangleId = (id) => {
  return id.toLowerCase().replace(/[ ,’()]/g, "-");
};

export default function LessonList({ lessonIndex, url }) {
  useEffect(() => {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 0) {
        const el = document.querySelector(hash);
        let top = 0;
        if (el && el.getBoundingClientRect().top) {
          top = el.getBoundingClientRect().top;
        }
        let scrollOptions = {
          left: 0,
          top: window.pageYOffset + top,
          behavior: "smooth",
        };
        if (el) {
          window.scrollTo(scrollOptions);
          window.setTimeout(function () {
            el.focus();
          }, 300);
        }
      }
    };
    scrollToAnchor();

    window.onhashchange = scrollToAnchor;
  }, [lessonIndex]);

  const groupedLessons = groups(
    lessonIndex,
    (d) => d.category,
    (d) => d.subcategory
  );

  return (
    <div>
      <p className="mb0">Jump to:</p>
      <ul>
        {groupedLessons.map(([category, subcategories]) => (
          <li key={category}>
            <a href={`#${wrangleId(category)}`}>{category}</a>
            {subcategories[0][0] && (
              <ul>
                {subcategories.map(([subcategory, _]) => (
                  <li key={subcategory}>
                    <a href={`#${wrangleId(subcategory)}`}>{subcategory}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {groupedLessons.map(([category, subcategories]) => {
        return (
          <div key={category}>
            <a
              href={`#${wrangleId(category)}`}
              id={wrangleId(category)}
              className="heading-link--content"
            >
              <h4 className="h3">{category}</h4>
            </a>
            {subcategories.map(([subcategory, lessons]) => {
              if (subcategory) {
                return (
                  <div key={subcategory}>
                    <a
                      href={`#${wrangleId(subcategory)}`}
                      id={wrangleId(subcategory)}
                      className="heading-link--content"
                    >
                      <h5 className="h4">{subcategory}</h5>
                    </a>
                    <InnerLessonList lessons={lessons} url={url} />
                  </div>
                );
              } else {
                return (
                  <div key={subcategory}>
                    <InnerLessonList lessons={lessons} url={url} />
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}
