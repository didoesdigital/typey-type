import React from "react";

type Props = {
  ruleName: any;
  prettyName: any;
  onChangeRuleStatus: any;
  rulesState: any;
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
