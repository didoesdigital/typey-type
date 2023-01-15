import React from "react";

interface Props {
  children: React.ReactNode;
}

const DescriptionTerm = ({ children }: Props) => {
  return (
    <dt className="mb05 lg:grow-0 lg:shrink-0 lg:basis-32 lg:overflow-hidden lg:text-ellipsis">
      {children}
    </dt>
  );
};

export default DescriptionTerm;
