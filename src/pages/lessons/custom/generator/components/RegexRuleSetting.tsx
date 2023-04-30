import React from "react";

import type { RuleStatus } from "../types";

type Props = {
  regexRuleName: "outlineMatching" | "translationMatching";
  regexRuleStatus: RuleStatus;
  regexRuleDataValue: string;
  entryPart: "outline" | "translation";
  onChangeEntryRegexStatus: any;
  onChangeEntryRegexData: any;
  placeholder: string;
};

const RegexRuleSettings = ({
  regexRuleName,
  regexRuleStatus,
  regexRuleDataValue,
  entryPart,
  onChangeEntryRegexStatus,
  onChangeEntryRegexData,
  placeholder,
}: Props) => (
  <div className="flex flex-wrap gap-4">
    <p className="mb1 flex items-center">
      <select
        id={regexRuleName}
        name={regexRuleName} // translationMatching
        value={regexRuleStatus} // "on"
        onChange={onChangeEntryRegexStatus}
        data-rule-status={regexRuleStatus}
        className="rule-select text-small form-control w-80 mr1"
      >
        <option value="on">On</option>
        <option value="off">Off</option>
        <option value="ignored">Ignored</option>
      </select>
      <label className="dib lh-single" htmlFor={regexRuleName}>
        has {entryPart} matching
      </label>
    </p>
    <p className="flex flex-wrap items-center gap-4 mb1">
      <label htmlFor={`${entryPart}-regex`}>{entryPart} regex:</label>
      <input
        id={`${entryPart}-regex`}
        className="caret-color bg-white dark:bg-coolgrey-1000 input-textarea underline overflow-hidden w-336"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={onChangeEntryRegexData}
        placeholder={placeholder}
        spellCheck={false}
        type="text"
        value={regexRuleDataValue} // "(tion|cean)"
      ></input>
    </p>
  </div>
);

export default RegexRuleSettings;
