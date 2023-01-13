import React from "react";

interface Props {
  children: JSX.Element[];
}

const DescriptionList = ({ children }: Props) => {
  return (
    <dl className="lg:flex lg:flex-row lg:flex-wrap lg:overflow-visible">
      {children}
    </dl>
  );
};

export default DescriptionList;
