import React from "react";
import { Tooltip } from "react-tooltip";
import type { PlacesType } from "react-tooltip";

export type TypeyTypeTooltipProps = {
  id: string;
  place?: PlacesType | undefined;
};

const TypeyTypeTooltip = ({ id, place }: TypeyTypeTooltipProps) => (
  <Tooltip
    id={id}
    place={place}
    className="typey-type-tooltip"
    border="2px solid var(--coolgrey-500, #E2E0E5)"
    opacity={1}
    globalCloseEvents={{ escape: true }}
  />
);

export default TypeyTypeTooltip;
