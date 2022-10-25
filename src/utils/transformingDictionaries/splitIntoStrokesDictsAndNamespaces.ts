import { SOURCE_NAMESPACES } from "../../constant/index.js";

const namespaceRegex = new RegExp(
  `^(?<Source>(${Array.from(SOURCE_NAMESPACES.values()).join(
    "|"
  )})):(?<Name>.+)$`
);

function splitIntoStrokesDictsAndNamespaces(
  strokesAndSources: [string, string][]
) {
  let namespacedStrokesAndDicts = strokesAndSources.map((strokesAndSource) => {
    let outline = strokesAndSource[0];

    let sourceDictName;
    let sourceNamespace;
    let match = strokesAndSource[1].match(namespaceRegex);
    if (match !== null) {
      sourceDictName = match.groups?.Name || "";
      sourceNamespace = match.groups?.Source || "";
    } else {
      sourceDictName = strokesAndSource[1];
      sourceNamespace = "";
    }

    return [outline, sourceDictName, sourceNamespace];
  });

  return namespacedStrokesAndDicts;
}
export default splitIntoStrokesDictsAndNamespaces;
