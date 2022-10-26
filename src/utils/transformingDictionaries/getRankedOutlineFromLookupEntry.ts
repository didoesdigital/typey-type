import rankOutlines from "./rankOutlines";
import splitIntoStrokesDictsAndNamespaces from "./splitIntoStrokesDictsAndNamespaces";
import misstrokesJSON from "../../json/misstrokes.json";
import { AffixList } from "../affixList";
import type { LookupDictValues } from "../../types";

const getRankedOutlineFromLookupEntry = (
  lookupEntry: LookupDictValues,
  translation: string,
  affixList = AffixList.getSharedInstance()
) =>
  rankOutlines(
    splitIntoStrokesDictsAndNamespaces(lookupEntry),
    misstrokesJSON,
    translation,
    affixList
  )[0][0];

export default getRankedOutlineFromLookupEntry;
