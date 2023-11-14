import React, { RefObject } from "react";

type Props = {
  inputRef: RefObject<HTMLTextAreaElement>;
};

const CustomFingerDrills = ({ inputRef }: Props) => {
  return (
    <>
      <p className="mb0">
        <label htmlFor="custom-finger-drill-material">
          Custom finger drill material
        </label>
      </p>
      <textarea
        id="custom-finger-drill-material"
        className="input-textarea bg-info dark:text-coolgrey-900 bw-1 b--solid br-4 db w-100 mw100"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        placeholder="e.g. EGT ELS"
        spellCheck={false}
        ref={inputRef}
        rows={6}
      />
    </>
  );
};

export default CustomFingerDrills;
