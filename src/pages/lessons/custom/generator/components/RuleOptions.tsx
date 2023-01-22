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
    <label className="dib order-2 lh-single" htmlFor={ruleName}>
      {prettyName}
    </label>
    <select
      id={ruleName}
      name={ruleName}
      value={rulesState[ruleName]}
      onChange={onChangeRuleStatus}
      className="text-small form-control mw-80 mr1"
    >
      <option value="on">On</option>
      <option value="off">Off</option>
      <option value="disabled">Disabled</option>
    </select>
  </p>
);

export default RuleOptions;
