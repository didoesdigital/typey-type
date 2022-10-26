import { SOURCE_NAMESPACES } from "../../constant/index.js";

const namespaceRegex = new RegExp(
  `^(?<Source>(${Array.from(SOURCE_NAMESPACES.values()).join(
    "|"
  )})):(?<Name>.+)$`
);

const splitIntoStrokesDictsAndNamespaces = (
  strokesAndSources: [string, string][]
) =>
  strokesAndSources.map((strokesAndSource) => {
    const outline = strokesAndSource[0];

    const match = strokesAndSource[1].match(namespaceRegex);
    const sourceDictNameAndNamespace: [string, string] = match
      ? [match.groups?.Name || "", match.groups?.Source || ""]
      : [strokesAndSource[1], ""];

    const result: [string, string, string] = [outline, ...sourceDictNameAndNamespace];
    return result;
  });

export default splitIntoStrokesDictsAndNamespaces;
