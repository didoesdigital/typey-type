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
        data-tooltip-id={id}
        data-tooltip-content={content}
        tabIndex={0}
        className="flex items-center"
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
