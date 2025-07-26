import React, { useEffect, useMemo, useRef, useState } from "react";
import GoogleAnalytics from "react-ga4";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { groups } from "d3-array";
import { useLessonIndex } from "../../../../states/lessonIndexState";
import debounce from "../../../../utils/debounce";
import filterLessons from "pages/lessons/components/LessonList/filterLessonsBySearchTerm";
import GroupedLessons from "pages/lessons/components/LessonList/GroupedLessons";
import TableOfContents from "pages/lessons/components/LessonList/TableOfContents";

const mungeHash = (hash: string) => {
  return decodeURIComponent(hash);
};

const scrollToHeading = (hash: Location["hash"]) => {
  // Given #gerard-nolst-trenit%C3%A9, decode it to #gerard-nolst-trenité
  const el = document.querySelector<HTMLAnchorElement>(
    window.decodeURIComponent(hash)
  );
  let top = 0;
  if (el && el.getBoundingClientRect().top) {
    top = el.getBoundingClientRect().top;
  }
  const scrollOptions: ScrollToOptions = {
    left: 0,
    top: window.scrollY + top,
    behavior: "smooth",
  };
  if (el) {
    window.scrollTo(scrollOptions);
    window.setTimeout(function () {
      el.focus();
    }, 300);
  }
};

export default function LessonList() {
  const location = useLocation();
  const navigate = useNavigate();
  const lessonIndex = useLessonIndex();
  const [searchFilter, setSearchFilter] = useState(
    () => new URLSearchParams(location.search).get("q") ?? ""
  );

  const filteredLessonIndex = filterLessons(searchFilter, lessonIndex);

  const memoisedUpdateSearchParams = useMemo(
    () =>
      debounce((q: string) => {
        const search = q === "" ? "" : `?q=${q}`;
        const hash = location.hash.length > 1 ? `${location.hash}` : "";
        navigate(`${search}${hash}`, { replace: true });
      }, 100),
    [location.hash, navigate]
  );

  // When search filter input value changes, update search params in URL with debounce:
  useEffect(() => {
    memoisedUpdateSearchParams(searchFilter);
  }, [searchFilter, memoisedUpdateSearchParams]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scrollToAnchor = () => {
      // https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673
      window.setTimeout(() => {
        const hash = window.location.hash;
        if (hash && hash.length > 0) {
          scrollToHeading(mungeHash(hash));
        } else {
          searchInputRef?.current?.focus();
        }
      }, 0);
    };
    scrollToAnchor();

    window.onhashchange = scrollToAnchor;
  }, [location.hash, navigate]);

  const changeSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchFilter(searchTerm);

    if (searchTerm && searchTerm.toString()) {
      GoogleAnalytics.event({
        category: "Search filter lessons",
        action: "LessonIndexSearchFilterChange",
        label: searchTerm.toString(),
      });
    } else {
      GoogleAnalytics.event({
        category: "Search filter lessons",
        action: "LessonIndexSearchFilterEmpty",
        label: "EMPTY_SEARCH_TEXT",
      });
    }
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
          className="caret-color w-100 bg-white dark:bg-coolgrey-1000 input-textarea mb3 overflow-hidden"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onChange={changeSearchFilter}
          spellCheck={false}
          type="search"
          value={searchFilter}
        ></input>
      </div>

      {searchFilter.trim().toLowerCase().includes("custom") && (
        <p className="py05">
          <Link
            to={`/lessons/custom/setup`.replace(/\/{2,}/g, "/")}
            id="ga--lesson-index--search--create-a-custom-lesson"
          >
            Create a custom lesson
          </Link>
        </p>
      )}

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

      <TableOfContents
        groupedLessons={groupedLessons}
        searchFilter={searchFilter}
      />

      <GroupedLessons groupedLessons={groupedLessons} />
    </div>
  );
}
