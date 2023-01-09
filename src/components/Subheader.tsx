import React from "react";

type Props = {
  id?: string;
  children: React.ReactNode;
};

const Subheader = ({ id, children }: Props) => (
  <div className="subheader text-violet-200 bg-violet-900" id={id}>
    <div className="flex flex-wrap items-baseline mx-auto mw-1920 justify-between px3 py2">
      {children}
    </div>
  </div>
);

export default Subheader;
