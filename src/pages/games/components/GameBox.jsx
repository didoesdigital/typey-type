import React from "react";
import { Link } from "react-router-dom";

export default function GameBox({
  // @ts-expect-error TS(7031) FIXME: Binding element 'title' implicitly has an 'any' ty... Remove this comment to see the full error message
  title,
  // @ts-expect-error TS(7031) FIXME: Binding element 'description' implicitly has an 'a... Remove this comment to see the full error message
  description,
  // @ts-expect-error TS(7031) FIXME: Binding element 'linkTo' implicitly has an 'any' t... Remove this comment to see the full error message
  linkTo,
  // @ts-expect-error TS(7031) FIXME: Binding element 'linkText' implicitly has an 'any'... Remove this comment to see the full error message
  linkText,
  // @ts-expect-error TS(7031) FIXME: Binding element 'robot' implicitly has an 'any' ty... Remove this comment to see the full error message
  robot,
}) {
  return (
    <div className="bw-12 br-4 b--solid b--brand-primary p3 mt3 mr3 text-center">
      <div className="w-100 mw-48 mx-auto game-robot">{robot}</div>
      <p>
        <strong>{title}</strong>
      </p>
      <p className="de-emphasized mw-320">{description}</p>
      <div className="flex flex-wrap justify-center">
        <Link to={linkTo} className="button pl3" style={{ lineHeight: 2 }}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}
