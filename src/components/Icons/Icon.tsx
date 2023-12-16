import React from "react";

interface IconProps {
  /** e.g. `ExternalIcon` with `import ExternalIcon from "./icon-images/External.svg";` */
  iconSVGImport: string;
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
  iconSVGImport,
  width = "1em",
  height = "1em",
  color,
  className,
  style,
}) => {
  const iconStyle: React.CSSProperties = {
    backgroundColor: color,
    display: "inline-block",
    mask: `url(${iconSVGImport}) no-repeat center / contain`,
    width,
    height,
    ...style,
  };

  return <span className={className || "icon"} style={iconStyle}></span>;
};

export default Icon;
