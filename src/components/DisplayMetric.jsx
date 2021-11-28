import React from "react";

export default function DisplayMetric({ value, label, valueSuffix, size }) {
  const classes = size && size === "L"
    ? "stat__number stat__number--min-w text-center stat__number--display"
    : "stat__number stat__number--min-w text-center"
  return (
    <div className="stat">
      <div className={classes}>
        {value}
        {valueSuffix && <span className="smaller">{ valueSuffix }</span>}
      </div>
      <div className="stat__label text-center">{label}</div>
    </div>
  );
}
