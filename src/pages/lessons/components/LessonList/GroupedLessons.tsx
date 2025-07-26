import React from "react";
import { wrangleId } from "pages/lessons/components/LessonList/LessonList";
import { InnerLessonList } from "pages/lessons/components/LessonList/InnerLessonList";
import type { Category, LessonIndexEntry } from "types";

type GroupedLessonProps = {
  groupedLessons: [Category, [string, LessonIndexEntry[]][]][];
};

const GroupedLessons = ({ groupedLessons }: GroupedLessonProps) => {
  return (
    <>
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
                    <InnerLessonList lessonIndex={lessons} />
                  </div>
                );
              } else {
                return (
                  <div key={subcategory}>
                    <InnerLessonList lessonIndex={lessons} />
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </>
  );
};

export default GroupedLessons;
