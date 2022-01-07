import React from "react";
import { Tooltip } from "react-tippy";

export default function DisplayMetric({
  value,
  label,
  valueSuffix,
  size,
  tooltipMessage,
  setAnnouncementMessage
}) {
  const classes =
    size && size === "L"
      ? "stat__number stat__number--min-w lh-single text-center stat__number--display"
      : "stat__number stat__number--min-w lh-single text-center";
  return (
    <div className="stat px3 mt3">
      <div className={classes}>
        {value}
        {valueSuffix && <span className="smaller">{valueSuffix}</span>}
      </div>
      {tooltipMessage ? (
        <Tooltip
          animation="shift"
          arrow="true"
          className="mw-240"
          duration="200"
          tabIndex="0"
          tag="abbr"
          theme="didoesdigital didoesdigital-sm"
          title={tooltipMessage}
          trigger="mouseenter focus click"
          onShow={setAnnouncementMessage}
        >
          <div className="stat__label text-center dib">{label}</div>
        </Tooltip>
      ) : (
        <div className="stat__label text-center">{label}</div>
      )}
    </div>
  );
}
