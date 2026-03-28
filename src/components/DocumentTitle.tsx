import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  title: string;
  children?: React.ReactChild | null | undefined;
};

const DocumentTitle = ({ children, title }: Props) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default DocumentTitle;
