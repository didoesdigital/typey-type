import React from "react";
import Tooltip from "./Tooltip";
import slugifyTitle from "../utils/slugifyTitle";

type Props = {
  value: number;
  label: string;
  valueSuffix: string | undefined;
  size: "M" | "L";
  tooltipMessage: string;
};

export default function DisplayMetric({
  value,
  label,
  valueSuffix,
  size,
  tooltipMessage,
}: Props) {
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
        <div>
          <div
            data-tooltip-id={slugifyTitle(label)}
            data-tooltip-content={tooltipMessage}
            className="abbr dib"
            tabIndex={0}
            role="button"
          >
            <div className="stat__label text-center dib">{label}</div>
          </div>

          <Tooltip id={slugifyTitle(label)} />
        </div>
      ) : (
        <div className="stat__label text-center">{label}</div>
      )}
    </div>
  );
}
