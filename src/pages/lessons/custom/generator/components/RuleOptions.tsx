import * as React from "react";
import type { RuleStatus } from "pages/lessons/custom/generator/types";

// This could one day be something like `type RuleName = keyof Required<Rules>;`
/** e.g. "hasOneOrMoreSpaces" */
type RuleName = string;

/** e.g. "has one or more spaces" */
type RulePrettyName = string;

type Props = {
  ruleName: RuleName;
  prettyName: RulePrettyName;
  onChangeRuleStatus: React.ChangeEventHandler<HTMLSelectElement>;
  rulesState: Record<RuleName, RuleStatus>;
};

const RuleOptions = ({
  ruleName,
  prettyName,
  onChangeRuleStatus,
  rulesState,
}: Props) => (
  <p className="mb1 flex items-center">
    <select
      id={ruleName}
      name={ruleName}
      value={rulesState[ruleName]}
      onChange={onChangeRuleStatus}
      data-rule-status={rulesState[ruleName]}
      className="rule-select text-small form-control w-80 mr1"
    >
      <option value="on">On</option>
      <option value="off">Off</option>
      <option value="ignored">Ignored</option>
    </select>
    <label className="dib lh-single" htmlFor={ruleName}>
      {prettyName}
    </label>
  </p>
);

export default RuleOptions;
