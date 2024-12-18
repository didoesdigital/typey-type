import { Outline, StrokeDictNamespaceAndMisstrokeStatus } from "types";
import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";
import tpgDict from "constant/topProjectGutenbergDictName";

/**
 *
 * @param listOfStrokesDictsNamespaceMisstroke - list of sorted entries
 * @returns list of entries without repeating typey: outlines if
 * typey:top-10000-project-gutenberg-words.json already has the outline
 */
const removePreferredOutlineDuplicates = (
  listOfStrokesDictsNamespaceMisstroke: StrokeDictNamespaceAndMisstrokeStatus[]
): StrokeDictNamespaceAndMisstrokeStatus[] => {
  let tpgOutline: null | Outline = null;

  const filteredResult = listOfStrokesDictsNamespaceMisstroke.filter(
    ([outline, dictName, namespace]) => {
      if (
        dictName === tpgDict &&
        namespace === SOURCE_NAMESPACES.get("typey")
      ) {
        tpgOutline = outline;
        return true;
      }

      return outline === tpgOutline ? false : true;
    }
  );

  return filteredResult;
};

export default removePreferredOutlineDuplicates;
