import React from "react";

type Props = {
  ruleName: any;
  prettyName: any;
  onChangeRuleStatus: any;
  rulesState: any;
};

const RuleCheckbox = ({
  ruleName,
  prettyName,
  onChangeRuleStatus,
  rulesState,
}: Props) => (
  <p className="mb0">
    <label>
      <input
        type="checkbox"
        name={ruleName}
        id={ruleName}
        checked={rulesState[ruleName]}
        onChange={onChangeRuleStatus}
      />{" "}
      {prettyName}
    </label>
  </p>
);

export default RuleCheckbox;
