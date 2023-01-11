import React from "react";
import { Link } from "react-router-dom";

export default function GameBox({
  title,
  description,
  linkTo,
  linkText,
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
