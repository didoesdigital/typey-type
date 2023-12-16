import React from "react";

// NOTE: All uses of the IconExternal component should be updated to use
// the new Icon component with External.svg, then this component should
// be deleted. That's enough for one day though.

/** this ensures multiple "external icons" on one page have separate IDs */
function idForIcon(prefix: string) {
  return (
    prefix +
    "-" +
    Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
  );
}

type Props = {
  iconTitle?: string;
  iconWidth: string;
  iconHeight: string;
  className?: string;
  role?: "img" | "presentation";
  ariaHidden?: "true" | "false";
};

const IconExternal = (props: Props) => {
  const titleIdAndAriaLabelledBy = idForIcon("iconExternalTitle");
  const maskId = idForIcon("mask-external");

  const iconWidth = +props.iconWidth || 24;
  const iconHeight = +props.iconHeight || 24;
  let iconTitle = "";
  if (props.iconTitle === "") {
    iconTitle = "";
  } else if (props.iconTitle) {
    iconTitle = props.iconTitle;
  } else {
    iconTitle = "External";
  }
  const classes = props.className || "";
  const role = props.role || "img";
  const ariaHidden = props.ariaHidden || "false";
  return (
    <span className={classes}>
      <svg
        aria-hidden={ariaHidden}
        role={role}
        width={iconWidth}
        height={iconHeight}
        aria-labelledby={titleIdAndAriaLabelledBy}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <title id={titleIdAndAriaLabelledBy}>{iconTitle}</title>
        <mask id={maskId} fill="#fff">
          <path d="M11 22v-2h6v-6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H11zm-9-9h2v7h7v2H2.5a.5.5 0 0 1-.5-.5V13zm9-7.5v1a.5.5 0 0 1-.5.5H4v6H2V5.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5zM21.5 9h-1a.5.5 0 0 1-.5-.5v-3l-8.146 8.146a.5.5 0 0 1-.708 0l-.792-.792a.5.5 0 0 1 0-.708L18.5 4h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5z"></path>
        </mask>
        <g mask={"url(#" + maskId + ")"} fill="currentColor">
          <path d="M0 0h24v24H0z" />
        </g>
      </svg>
    </span>
  );
};

export { IconExternal };
