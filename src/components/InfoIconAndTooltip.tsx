import React from "react";
import Icon from "./Icons/Icon";
import Info from "./Icons/icon-images/Info.svg";
import Tooltip from "./Tooltip";
import type { TypeyTypeTooltipProps } from "./Tooltip";

type Props = TypeyTypeTooltipProps & {
  content: string;
};

const InfoIconAndTooltip = ({ id, content, place }: Props) => {
  return (
    <>
      <div
        aria-label="More information"
        className="flex items-center"
        data-tooltip-content={content}
        data-tooltip-id={id}
        role="note"
        tabIndex={0}
      >
        <Icon
          iconSVGImport={Info}
          width="24px"
          height="24px"
          className="icon de-emphasized"
        />
      </div>
      <Tooltip id={id} place={place} />
    </>
  );
};

export default InfoIconAndTooltip;
