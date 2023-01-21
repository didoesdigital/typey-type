import { actions } from "./rulesActions";
import type { Rules } from "./types";

const defaultState: Rules = {
  isOneSyllable: true,
  hasEfAsVeeOrEss: false,
};

export const initConfig = (state: Rules) => ({
  ...defaultState,
  ...state,
});

const toggleRule = (state: Rules, payload: { ruleName: keyof Rules }) => {
  return {
    ...state,
    [payload.ruleName]: !state[payload.ruleName],
  };
};

export const rulesReducer = (state: Rules, action: any) => {
  switch (action?.type) {
    case actions.toggleRule:
      return toggleRule(state, action.payload);

    default:
      return state;
  }
};
