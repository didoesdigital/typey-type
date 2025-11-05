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
          // @ts-expect-error TS(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
          newSettings[param] = true;
        }
        if (paramVal === "0") {
          // @ts-expect-error TS(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
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
        // @ts-expect-error TS(2345) FIXME: Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
        spacePlacementValidValues.includes(paramVal ?? "")
      ) {
        // @ts-expect-error TS(2322) FIXME: Type 'string | string[] | null | undefined' is not... Remove this comment to see the full error message
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

      // @ts-expect-error TS(2345) FIXME: Argument of type 'string | string[] | null | undef... Remove this comment to see the full error message
      if (param === "sortOrder" && sortOrderValidValues.includes(paramVal)) {
        // @ts-expect-error TS(2322) FIXME: Type 'string | string[] | null | undefined' is not... Remove this comment to see the full error message
        newSettings[param] = paramVal;
      }

      const studyValidValues = ["discover", "revise", "drill", "practice"];

      // @ts-expect-error TS(2345) FIXME: Argument of type 'string | string[] | null | undef... Remove this comment to see the full error message
      if (param === "study" && studyValidValues.includes(paramVal)) {
        // @ts-expect-error TS(2322) FIXME: Type 'string | string[] | null | undefined' is not... Remove this comment to see the full error message
        newSettings[param] = paramVal;
      }

      const stenoLayoutValidValues = [
        "stenoLayoutAmericanSteno",
        "stenoLayoutLapwingSteno",
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
        // @ts-expect-error TS(2345) FIXME: Argument of type 'string | string[] | null | undef... Remove this comment to see the full error message
        stenoLayoutValidValues.includes(paramVal)
      ) {
        // @ts-expect-error TS(2322) FIXME: Type 'string | string[] | null | undefined' is not... Remove this comment to see the full error message
        newSettings[param] = paramVal;
      }

      if (
        (param === "repetitions" ||
          param === "limitNumberOfWords" ||
          param === "startFromWord") &&
        // @ts-expect-error TS(2345) FIXME: Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
        isNormalInteger(paramVal ?? "")
      ) {
        const paramValNumber = Number(paramVal);
        newSettings[param] = paramValNumber;
      }
    }
  }

  return newSettings;
};

export default applyQueryParamsToUserSettings;
