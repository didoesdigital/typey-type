import React from "react";
import SingleLineMaterial from "./Material/SingleLineMaterial";

export default function Material(props) {
  return props.userSettings.upcomingWordsLayout === "multiline" ? (
    <SingleLineMaterial {...props} />
  ) : (
    <SingleLineMaterial {...props} />
  );
}
