import strokeLimit from "../../constant/strokeLimit";

const getPhraseSplitLimit = (depth: number) => Math.max(0, strokeLimit - depth);

export default getPhraseSplitLimit;
