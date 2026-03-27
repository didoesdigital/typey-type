import React from "react";
import ReactDocumentTitle from "react-document-title";

type Props = {
  title: string;
  children?: React.ReactChild | null | undefined;
};

const DocumentTitle = ({ children, title }: Props) => {
  return <ReactDocumentTitle title={title}>{children}</ReactDocumentTitle>;
};

export default DocumentTitle;
