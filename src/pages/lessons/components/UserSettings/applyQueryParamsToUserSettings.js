import isNormalInteger from "../../../../utils/isNormalInteger";

const applyQueryParamsToUserSettings = (newSettings, parsedParams, userSettings) => {
    // Update newSettings using URL search query parameters:
    for (const [param, paramVal] of Object.entries(parsedParams)) {
      if (param in userSettings) {
        const booleanParams = [
          'blurMaterial',
          'caseSensitive',
          'simpleTypography',
          'punctuationDescriptions',
          'retainedWords',
          'newWords',
          'showScoresWhileTyping',
          'showStrokes',
          'showStrokesAsDiagrams',
          'showStrokesAsList',
          'hideStrokesOnLastRepetition',
          'speakMaterial',
          'textInputAccessibility',
          'seenWords'
        ];

        if (booleanParams.includes(param)) {
          if (paramVal === "1") { newSettings[param] = true; }
          if (paramVal === "0") { newSettings[param] = false; }
        }

        const spacePlacementValidValues = [
          'spaceOff',
          'spaceBeforeOutput',
          'spaceAfterOutput',
          'spaceExact'
        ];

        if (param === 'spacePlacement' && spacePlacementValidValues.includes(paramVal)) {
          newSettings[param] = paramVal;
        }

        const sortOrderValidValues = [
          'sortOff',
          'sortNew',
          'sortOld',
          'sortRandom',
          'sortLongest',
          'sortShortest'
        ];

        if (param === 'sortOrder' && sortOrderValidValues.includes(paramVal)) {
          newSettings[param] = paramVal;
        }

        const studyValidValues = [
          'discover',
          'revise',
          'drill',
          'practice'
        ];

        if (param === 'study' && studyValidValues.includes(paramVal)) {
          newSettings[param] = paramVal;
        }

        const stenoLayoutValidValues = [
          'stenoLayoutAmericanSteno',
          'stenoLayoutNoNumberBarInnerThumbNumbers',
          'stenoLayoutNoNumberBarOuterThumbNumbers',
          'stenoLayoutPalantype',
          'stenoLayoutBrazilianPortugueseSteno',
          'stenoLayoutDanishSteno',
          'stenoLayoutItalianMichelaSteno',
          'stenoLayoutItalianMelaniSteno',
          'stenoLayoutJapanese',
          'stenoLayoutKoreanModernC',
          // 'stenoLayoutKoreanModernS'
        ];

        if (param === 'stenoLayout' && stenoLayoutValidValues.includes(paramVal)) {
          newSettings[param] = paramVal;
        }

        if ((param === 'repetitions' || param === 'limitNumberOfWords' || param === 'startFromWord') && isNormalInteger(paramVal)) {
          let paramValNumber = Number(paramVal);
          newSettings[param] = paramValNumber;
        }
      }
    }
}

export default applyQueryParamsToUserSettings;