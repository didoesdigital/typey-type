import { type ReactNode } from "react";
import Helmet from "react-helmet";

type Props = {
  title: string;
  children?: ReactNode;
};

const DocumentTitle = ({ children, title }: Props) => {
  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default DocumentTitle;
