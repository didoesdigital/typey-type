function getTooltipText(tooltip: HTMLElement) {
  return tooltip.querySelector(".tippy-tooltip-content")?.textContent ?? "";
}

export default getTooltipText;
