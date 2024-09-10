import React from "react";

type Props = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  modalAndButton?: React.ReactNode;
  nameAndId: string;
  onChange: any;
  wrapperClasses?: string;
};

const SettingCheckbox = ({
  checked,
  disabled,
  label,
  modalAndButton = undefined,
  nameAndId,
  onChange,
  wrapperClasses = "",
}: Props) => {
  return (
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
        {label}
      </label>
      {!modalAndButton ? null : modalAndButton}
    </div>
  );
};

export default SettingCheckbox;
