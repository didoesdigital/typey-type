import rankOutlines from "./rankOutlines/rankOutlines";
import splitIntoStrokesDictsAndNamespaces from "./splitIntoStrokesDictsAndNamespaces";
import misstrokesJSON from "../../json/misstrokes.json";
import { AffixList } from "../affixList";
import type { StrokeAndNamespacedDict, Translation } from "../../types";

/**
 * Ranks outlines (and their source dictionaries) for a translation and returns the “best” outline and its source dictionary
 */
const getRankedOutlineFromLookupEntry = (
  lookupEntries: StrokeAndNamespacedDict[],
  translation: Translation,
  affixList = AffixList.getSharedInstance()
) =>
  rankOutlines(
    splitIntoStrokesDictsAndNamespaces(lookupEntries),
    misstrokesJSON,
    translation,
    affixList
  )[0][0];

export default getRankedOutlineFromLookupEntry;
