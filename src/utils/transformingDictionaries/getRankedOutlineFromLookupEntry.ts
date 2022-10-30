import rankOutlines from "./rankOutlines/rankOutlines";
import splitIntoStrokesDictsAndNamespaces from "./splitIntoStrokesDictsAndNamespaces";
import misstrokesJSON from "../../json/misstrokes.json";
import { AffixList } from "../affixList";
import type { StrokeAndNamespacedDict, Translation } from "../../types";

/**
 * Ranks outlines (and their source dictionaries) for a translation and returns the “best” outline and its source dictionary
 *
 * @param lookupEntries - Example: [ ["THAUT", "plover:main.json"], ["THAUGT", "typey:typey-type.json"] ],
 * @param translation - Example: "gazed"
 * @param affixList - Example: { prefixes: [["A*UT/", "auto"], ["TPHRAOUR/", "fluoro"]], suffixes: [["/WAL", "ual"], ["/AOEUBL", "izable"]] }
 * @returns bestOutline - Example: "TEFT"
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
