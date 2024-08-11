import queryString from "query-string";
import type { UserSettings } from "../../../../types";
import isNormalInteger from "../../../../utils/isNormalInteger";

const applyQueryParamsToUserSettings = (
  newSettings: UserSettings,
  parsedParams: queryString.ParsedQuery<string>
) => {
  function isKeyOfNewSettings(key: string): key is keyof UserSettings {
    return key in newSettings;
  }

  for (const [param, paramVal] of Object.entries(parsedParams)) {
    if (isKeyOfNewSettings(param)) {
      const booleanParams = [
        "blurMaterial",
        "caseSensitive",
        "simpleTypography",
        "punctuationDescriptions",
        "retainedWords",
        "newWords",
        "showScoresWhileTyping",
        "showStrokes",
        "showStrokesAsDiagrams",
        "showStrokesAsList",
        "hideStrokesOnLastRepetition",
        "speakMaterial",
        "textInputAccessibility",
        "seenWords",
      ];

      if (booleanParams.includes(param)) {
        if (paramVal === "1") {
          // @ts-ignore
          newSettings[param] = true;
        }
        if (paramVal === "0") {
          // @ts-ignore
          newSettings[param] = false;
        }
      }

      const spacePlacementValidValues = [
        "spaceOff",
        "spaceBeforeOutput",
        "spaceAfterOutput",
        "spaceExact",
      ];

      if (
        param === "spacePlacement" &&
        // @ts-ignore
        spacePlacementValidValues.includes(paramVal ?? "")
      ) {
        // @ts-ignore
        newSettings[param] = paramVal;
      }

      const sortOrderValidValues = [
        "sortOff",
        "sortNew",
        "sortOld",
        "sortRandom",
        "sortLongest",
        "sortShortest",
      ];

      // @ts-ignore
      if (param === "sortOrder" && sortOrderValidValues.includes(paramVal)) {
        // @ts-ignore
        newSettings[param] = paramVal;
      }

      const studyValidValues = ["discover", "revise", "drill", "practice"];

      // @ts-ignore
      if (param === "study" && studyValidValues.includes(paramVal)) {
        // @ts-ignore
        newSettings[param] = paramVal;
      }

      const stenoLayoutValidValues = [
        "stenoLayoutAmericanSteno",
        "stenoLayoutNoNumberBarInnerThumbNumbers",
        "stenoLayoutNoNumberBarOuterThumbNumbers",
        "stenoLayoutPalantype",
        "stenoLayoutBrazilianPortugueseSteno",
        "stenoLayoutYaweiChineseSteno",
        "stenoLayoutDanishSteno",
        "stenoLayoutItalianMichelaSteno",
        "stenoLayoutItalianMelaniSteno",
        "stenoLayoutJapanese",
        "stenoLayoutKoreanModernC",
        // 'stenoLayoutKoreanModernS'
      ];

      if (
        param === "stenoLayout" &&
        // @ts-ignore
        stenoLayoutValidValues.includes(paramVal)
      ) {
        // @ts-ignore
        newSettings[param] = paramVal;
      }

      if (
        (param === "repetitions" ||
          param === "limitNumberOfWords" ||
          param === "startFromWord") &&
        // @ts-ignore
        isNormalInteger(paramVal ?? "")
      ) {
        let paramValNumber = Number(paramVal);
        newSettings[param] = paramValNumber;
      }
    }
  }

  return newSettings;
};

export default applyQueryParamsToUserSettings;
