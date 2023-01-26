import React from "react";

type Props = {
  sectionHierachy: "major" | "minor";
  children: JSX.Element | JSX.Element[];
};

const SettingListItem = ({ children, sectionHierachy }: Props) => (
  <li
    className={`ml0 pl1 bt ${
      sectionHierachy === "minor"
        ? "b--brand-primary-tint dark:border-coolgrey-1000"
        : "b--brand-primary-tint--60 dark:border-coolgrey-800"
    }`}
  >
    {children}
  </li>
);

export default SettingListItem;
