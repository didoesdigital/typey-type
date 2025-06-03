import type { MaterialItem } from "types";

export function updateCapitalisationStrokesInNextItem(
  nextItem: MaterialItem,
  lastWord: string
) {
  if (
    nextItem.stroke.startsWith("KPA/") ||
    nextItem.stroke.startsWith("HRO*ER/") ||
    nextItem.stroke.startsWith("*URP/")
  ) {
    if (
      lastWord.endsWith(".") ||
      lastWord.endsWith("!") ||
      lastWord.endsWith("?") ||
      lastWord.endsWith("…") ||
      lastWord.endsWith('!"') ||
      lastWord.endsWith('?"') ||
      lastWord.endsWith('."')
    ) {
      nextItem["stroke"] = nextItem["stroke"].replace(
        /^(KPA\/|\*URP\/|HRO\*ER\/)/,
        ""
      );
    }
  }

  if (
    nextItem.stroke.startsWith("KW-GS KPA") ||
    nextItem.stroke.startsWith("KR-GS KPA")
  ) {
    if (
      lastWord.endsWith(".") ||
      lastWord.endsWith("!") ||
      lastWord.endsWith("?") ||
      lastWord.endsWith("…") ||
      lastWord.endsWith('!"') ||
      lastWord.endsWith('?"') ||
      lastWord.endsWith('."')
    ) {
      nextItem["stroke"] = nextItem["stroke"].replace(
        /^(KR-GS KPA\/)/,
        "KR-GS "
      );
      nextItem["stroke"] = nextItem["stroke"].replace(
        /^(KW-GS KPA\/)/,
        "KW-GS "
      );
    }

    if (lastWord.match(/[A-Za-z]$/) || lastWord.endsWith(":")) {
      nextItem["stroke"] = nextItem["stroke"].replace(
        /^(KR-GS KPA\/)/,
        "KR-GS KPA*/"
      );
      nextItem["stroke"] = nextItem["stroke"].replace(
        /^(KW-GS KPA\/)/,
        "KW-GS KPA*/"
      );
    }
  }

  return nextItem;
}
