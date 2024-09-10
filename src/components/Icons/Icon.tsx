import React from "react";

type IconProps = React.ComponentPropsWithoutRef<"span"> & {
  /** e.g. `ClosingCross` with `import ClosingCross from "./icon-images/ClosingCross.svg";` */
  iconSVGImport: string;
  /** Use `em` unit to adjust icon with font size e.g. `1em` */
  width?: string;
  /** Use `em` unit to adjust icon with font size e.g. `1em` */
  height?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Icon: React.FC<IconProps> = ({
  iconSVGImport,
  width = "1em",
  height = "1em",
  color,
  className,
  style,
  ...props
}) => {
  const iconStyle: React.CSSProperties = {
    backgroundColor: color,
    display: "inline-block",
    WebkitMaskImage: `url(${iconSVGImport})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center center",
    WebkitMaskSize: "contain",
    mask: `url(${iconSVGImport}) no-repeat center / contain`,
    width,
    height,
    ...style,
  };

  return (
    <span {...props} className={className || "icon"} style={iconStyle}></span>
  );
};

export default Icon;
