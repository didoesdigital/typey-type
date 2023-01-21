const hasDisambiguatingBrief = (outline: string, translation: string) =>
  (outline === "HEURD" && translation === "hired") ||
  (outline === "WEUFS" && translation === "wives");

export default hasDisambiguatingBrief;
