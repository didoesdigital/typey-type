import type { MaterialText, StrokeDictNamespaceAndMisstrokeStatus } from "../types";

type Props = {
  modifiedWordOrPhrase: MaterialText;
  phrase: MaterialText;
  listOfStrokeDictNamespaceMisstroke: StrokeDictNamespaceAndMisstrokeStatus[];
};

const MatchedModifiedTranslation = ({
  modifiedWordOrPhrase,
  phrase,
  listOfStrokeDictNamespaceMisstroke,
}: Props) => {
  let classes =
    "dark:text-coolgrey-900 wrap mr1 order-1 fw4 py05 bg-slat bw-1 b--solid";
  classes += modifiedWordOrPhrase === phrase ? " b-info" : " b-danger";
  return listOfStrokeDictNamespaceMisstroke &&
    listOfStrokeDictNamespaceMisstroke.length > 0 &&
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
