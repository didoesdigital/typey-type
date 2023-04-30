import { actions } from "./rulesWithDataActions";
import type { RuleStatus } from "./types";

export type RulesWithData = {
  outlineRegexText: string;
  outlineMatching: RuleStatus;
  translationRegexText: string;
  translationMatching: RuleStatus;
};

export const defaultState: RulesWithData = {
  outlineRegexText: "",
  outlineMatching: "ignored",
  translationRegexText: "",
  translationMatching: "ignored",
};

export const initConfig = (state: any) => ({
  ...defaultState,
  ...state,
});

const setRuleWithDataStatus = (
  state: RulesWithData,
  payload: {
    ruleName: "outlineMatching" | "translationMatching";
    ruleStatus: RuleStatus;
  }
) => {
  return {
    ...state,
    [payload.ruleName]: payload.ruleStatus,
  };
};

const setRegexRuleData = (
  state: RulesWithData,
  payload: {
    entryPart: "outline" | "translation";
    regexText: string;
  }
) => {
  return {
    ...state,
    [`${payload.entryPart}RegexText`]: payload.regexText,
  };
};

export const rulesWithDataReducer = (state: RulesWithData, action: any) => {
  switch (action?.type) {
    case actions.setRuleWithDataStatus:
      return setRuleWithDataStatus(state, action.payload);

    case actions.setRegexRuleData:
      return setRegexRuleData(state, action.payload);

    default:
      return state;
  }
};
