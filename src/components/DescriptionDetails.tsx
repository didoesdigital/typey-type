import React from "react";

interface Props {
  children: React.ReactNode;
}

const DescriptionDetails = ({ children }: Props) => {
  return (
    <dd className="mb-4 lg:grow-0 lg:shrink-0 lg:basis-27rem lg:ml-auto lg:overflow-hidden lg:text-ellipsis">
      {children}
    </dd>
  );
};

export default DescriptionDetails;
