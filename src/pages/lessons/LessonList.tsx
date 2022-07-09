import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { groups } from "d3-array";

type LessonIndexEntry = {
  category: string;
  overview: string;
  path: string;
  subcategory: string;
  subtitle: string;
  suggestedNext: string;
  title: string;
  wordCount: number;
};

type LessonListProps = {
  lessonIndex: LessonIndexEntry[];
  url: string;
};

const WordCount = ({ lesson }: { lesson: LessonIndexEntry }) => (
  <>{lesson.wordCount > 0 && ` · ${lesson.wordCount} words`}</>
);

const LessonLink = ({
  lesson,
  url,
}: {
  lesson: LessonIndexEntry;
  url: string;
}) => (
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

const InnerLessonList = ({ lessonIndex, url }: LessonListProps) => (
  <ul className="unstyled-list">
    {lessonIndex.map((lesson) => (
      <li className="unstyled-list-item mb1" key={lesson.path}>
        <LessonLink lesson={lesson} url={url} />
        <WordCount lesson={lesson} />
      </li>
    ))}
  </ul>
);

const wrangleId = (id: string) => {
  return id.toLowerCase().replace(/[ ,’()]/g, "-");
};

export default function LessonList({ lessonIndex, url }: LessonListProps) {
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredLessonIndex, setFilteredLessonIndex] = useState(lessonIndex);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 0) {
        const el = document.querySelector<HTMLAnchorElement>(hash);
        let top = 0;
        if (el && el.getBoundingClientRect().top) {
          top = el.getBoundingClientRect().top;
        }
        const scrollOptions: ScrollToOptions = {
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
      } else {
        inputRef?.current?.focus();
      }
    };
    scrollToAnchor();

    window.onhashchange = scrollToAnchor;
  }, []);

  useEffect(() => {
    setFilteredLessonIndex(lessonIndex);
  }, [lessonIndex]);

  const changeSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    const cleanedSearchTerm = searchTerm.trim().toLowerCase();

    const filteredLessons = lessonIndex.filter((lesson) => {
      const cleanedLessonTitle = lesson.title.toLowerCase();
      const searchSnippets = cleanedSearchTerm.split(" ");
      return searchSnippets.reduce(
        (trueSoFar, searchSnippet) =>
          trueSoFar && cleanedLessonTitle.includes(searchSnippet),
        true
      );
    });

    setSearchFilter(searchTerm);
    setFilteredLessonIndex(filteredLessons);
  };

  const groupedLessons = groups(
    filteredLessonIndex,
    (d) => d.category,
    (d) => d.subcategory
  );

  return (
    <div>
      <label
        htmlFor="lesson-search-filter"
        className="db mb1 inline-block mb05"
      >
        Search lessons:
      </label>
      <input
        ref={inputRef}
        id="lesson-search-filter"
        className="caret-color w-100 bg-white input-textarea mb3"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={changeSearchFilter}
        spellCheck={false}
        type="search"
        value={searchFilter}
      ></input>
      {searchFilter.length === 0 && (
        <>
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
        </>
      )}
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
                    <InnerLessonList lessonIndex={lessons} url={url} />
                  </div>
                );
              } else {
                return (
                  <div key={subcategory}>
                    <InnerLessonList lessonIndex={lessons} url={url} />
                  </div>
                );
              }
            })}
          </div>
        );
      })}
      {filteredLessonIndex.length === 0 && (
        <p>No results. Try changing your search.</p>
      )}
    </div>
  );
}
