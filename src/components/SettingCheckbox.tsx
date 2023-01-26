import React from "react";
import { Tooltip } from "react-tippy";

type Props = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  modalAndButton?: React.ReactNode;
  nameAndId: string;
  onChange: any;
  onShow: () => void;
  tooltipTitle: string;
  wrapperClasses?: string;
};

const SettingCheckbox = ({
  checked,
  disabled,
  label,
  modalAndButton = undefined,
  nameAndId,
  onChange,
  onShow,
  tooltipTitle,
  wrapperClasses = "",
}: Props) => (
  <div className={`${wrapperClasses || "block relative p1"}`}>
    <label className="checkbox-label mb1">
      <input
        className="checkbox-input mr1"
        type="checkbox"
        name={nameAndId}
        id={nameAndId}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      {!modalAndButton ? (
        // @ts-ignore
        <Tooltip
          title={tooltipTitle}
          className="mw-240"
          animation="shift"
          arrow="true"
          duration="200"
          tabIndex="0"
          tag="span"
          theme="didoesdigital didoesdigital-sm"
          trigger="mouseenter focus click"
          onShow={onShow}
        >
          {label}
        </Tooltip>
      ) : (
        label
      )}
    </label>
    {!modalAndButton ? null : modalAndButton}
  </div>
);

export default SettingCheckbox;
