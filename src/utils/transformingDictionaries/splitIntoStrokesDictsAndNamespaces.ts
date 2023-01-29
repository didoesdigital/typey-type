import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";
import type {
  DictName,
  Namespace,
  NamespacedDictionary,
  Outline,
  StrokeAndDictionaryAndNamespace,
  StrokeAndNamespacedDict,
} from "../../types";

const namespaceRegex = new RegExp(
  `^(?<Source>(${Array.from(SOURCE_NAMESPACES.values()).join(
    "|"
  )})):(?<Name>.+)$`
);

/**
 * Splits outlines and namespaced dictionaries into outline, dictionary name, and namespace
 *
 * Example:
 * ["TEFT", "user:personal"] =>
 * ["TEFT", "personal", "user"]
 */
const splitIntoStrokesDictsAndNamespaces = (
  strokesAndSources: StrokeAndNamespacedDict[]
): StrokeAndDictionaryAndNamespace[] =>
  strokesAndSources.map((strokesAndSource) => {
    const outline: Outline = strokesAndSource[0];
    const namespacedDict: NamespacedDictionary = strokesAndSource[1];
    const match = namespacedDict.match(namespaceRegex);
    const sourceDictNameAndNamespace: [DictName, Namespace] = match
      ? [match.groups?.Name || "", match.groups?.Source || ""]
      : [strokesAndSource[1], ""];

    const result: StrokeAndDictionaryAndNamespace = [
      outline,
      ...sourceDictNameAndNamespace,
    ];

    return result;
  });

export default splitIntoStrokesDictsAndNamespaces;
