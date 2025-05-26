import misstrokesJSON from "../../json/misstrokes.json";
import AFFIXES from "../affixes/affixes";
import rankOutlines from "./rankOutlines/rankOutlines";
import splitIntoStrokesDictsAndNamespaces from "./splitIntoStrokesDictsAndNamespaces";

import type {
  StenoDictionary,
  StrokeAndNamespacedDict,
  Translation,
} from "../../types";

// NOTE: When we are only using Typey Type dictionaries without misstrokes, this can be an empty
// object, otherwise we need to import or fetch a meaningful misstrokes.json file
const misstrokes = misstrokesJSON as StenoDictionary;

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
  affixList = AFFIXES.getSharedAffixes()
) =>
  rankOutlines(
    splitIntoStrokesDictsAndNamespaces(lookupEntries),
    misstrokes,
    translation,
    affixList
  )[0][0];

export default getRankedOutlineFromLookupEntry;
