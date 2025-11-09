import { wrangleId } from "./wrangleId";
import type { Category, LessonIndexEntry } from "types";

type TableOfContentsItemProps = {
  category: Category;
  subcategories: [string, LessonIndexEntry[]][];
};

const TableOfContentsItem = ({
  category,
  subcategories,
}: TableOfContentsItemProps) => (
  <li>
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
);

export default TableOfContentsItem;
