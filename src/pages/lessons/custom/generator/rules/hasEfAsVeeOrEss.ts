const hasEfAsVeeOrEss = (outline: string, translation: string) =>
  !!(outline.includes("F") && translation.match(/[aeiouy]+.*[sv]/));

export default hasEfAsVeeOrEss;
