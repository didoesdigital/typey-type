import TableOfContentsItem from "pages/lessons/components/LessonList/TableOfContentsItem";
import type { Category, LessonIndexEntry } from "types";

type Props = {
  groupedLessons: [Category, [string, LessonIndexEntry[]][]][];
  searchFilter: string;
};

const TableOfContents = ({ groupedLessons, searchFilter }: Props) => {
  return searchFilter.length === 0 ? (
    <>
      <p className="mb0">Jump to:</p>
      <ul>
        {groupedLessons.map(([category, subcategories]) => (
          <TableOfContentsItem
            key={category}
            category={category}
            subcategories={subcategories}
          />
        ))}
      </ul>
    </>
  ) : null;
};

export default TableOfContents;
