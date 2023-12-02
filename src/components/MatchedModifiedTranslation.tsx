import React from "react";

import type { MaterialText, StrokeAndDictionaryAndNamespace } from "../types";

type Props = {
  modifiedWordOrPhrase: MaterialText;
  phrase: MaterialText;
  listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[];
};

const MatchedModifiedTranslation = ({
  modifiedWordOrPhrase,
  phrase,
  listOfStrokesAndDicts,
}: Props) => {
  let classes =
    "dark:text-coolgrey-900 wrap mr1 order-1 fw4 py05 bg-slat bw-1 b--solid";
  classes += modifiedWordOrPhrase === phrase ? " b-info" : " b-danger";
  return listOfStrokesAndDicts &&
    listOfStrokesAndDicts.length > 0 &&
    modifiedWordOrPhrase ? (
    <p className="de-emphasized flex flex-wrap items-center">
      <span className="de-emphasized order-2">(text shown in dictionary)</span>
      <samp className={classes}>{modifiedWordOrPhrase}</samp>
    </p>
  ) : phrase === "" ? (
    <p></p>
  ) : (
    <p>No results found</p>
  );
};

export default MatchedModifiedTranslation;
