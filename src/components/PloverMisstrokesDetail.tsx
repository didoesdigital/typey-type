import React from "react";

type Props = {
  showMisstrokesInLookup: boolean | undefined;
};

const PloverMisstrokesDetail = ({ showMisstrokesInLookup }: Props) =>
  showMisstrokesInLookup ? (
    <p>
      <span className="py05 bg-danger dark:text-coolgrey-900">
        (Plover misstrokes included.)
      </span>
    </p>
  ) : (
    <p>
      <span className="py05 de-emphasized dark:text-coolgrey-900">
        (4000 misstrokes hidden.)
      </span>
    </p>
  );

export default PloverMisstrokesDetail;
