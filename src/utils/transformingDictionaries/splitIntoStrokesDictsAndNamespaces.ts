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
    const sourceDictNameAndNamespace = match
      ? [match.groups?.Name || "", match.groups?.Source || ""]
      : [strokesAndSource[1], ""];

    return [outline, ...sourceDictNameAndNamespace];
  });

export default splitIntoStrokesDictsAndNamespaces;
