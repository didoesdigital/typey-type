import React, { useEffect, useRef, useState } from "react";
import GoogleAnalytics from "react-ga";
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

const scrollToHeading = (hash: string) => {
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
};

export default function LessonList({ lessonIndex, url }: LessonListProps) {
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredLessonIndex, setFilteredLessonIndex] = useState(lessonIndex);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    const scrollToAnchor = () => {
      // https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673
      window.setTimeout(() => {
        const hash = window.location.hash;
        if (hash && hash.length > 0) {
          scrollToHeading(hash);
        } else {
          searchInputRef?.current?.focus();
        }
      }, 0);
    };
    scrollToAnchor();

    window.onhashchange = scrollToAnchor;
  }, [lessonIndex]);

  useEffect(() => {
    setFilteredLessonIndex(lessonIndex);
  }, [lessonIndex]);

  const changeSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    const cleanedSearchTerm = searchTerm
      .trim()
      .toLowerCase()
      .replaceAll(/[^ A-Za-z0-9’',*:-]/g, ""); // all characters that don't appear in lesson titles

    const filteredLessons = lessonIndex.filter((lesson) => {
      const cleanedLessonTitle = lesson.title.toLowerCase();
      const searchSnippets = cleanedSearchTerm.split(" ");
      return searchSnippets.reduce(
        (trueSoFar, searchSnippet) =>
          trueSoFar && cleanedLessonTitle.includes(searchSnippet),
        true
      );
    });

    if (searchTerm && searchTerm.toString()) {
      GoogleAnalytics.event({
        category: "Search filter lessons",
        action: "Change",
        label: searchTerm.toString(),
      });
    } else {
      GoogleAnalytics.event({
        category: "Search filter lessons",
        action: "Change",
        label: "EMPTY_SEARCH_TEXT",
      });
    }

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
      <div className="mw-584 flex-grow">
        <label
          htmlFor="lesson-search-filter"
          className="db mb1 inline-block mb05"
        >
          Search {lessonIndex.length} lessons:
        </label>
        <input
          ref={searchInputRef}
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
      </div>
      {filteredLessonIndex.length === 0 && (
        <p>No results. Try changing your search.</p>
      )}
      <p aria-live="polite" aria-atomic="true">
        {searchFilter.length > 0 && filteredLessonIndex.length > 0 && (
          <>
            {filteredLessonIndex.length}{" "}
            {`result${filteredLessonIndex.length === 1 ? "" : "s"}`}
          </>
        )}
      </p>
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
    </div>
  );
}
