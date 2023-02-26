const hasDisambiguatingBrief = (outline: string, translation: string) =>
  (outline === "HEURD" && translation === "hired") ||
  (outline === "WEUFS" && translation === "wives") ||
  (outline === "STREUF" && translation === "strive");

export default hasDisambiguatingBrief;
