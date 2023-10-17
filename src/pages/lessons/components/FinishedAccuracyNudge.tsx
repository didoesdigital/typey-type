import React from "react";

type FinishedAccuracyNudgeProps = {
  numericAccuracy: number;
};

const FinishedAccuracyNudge = ({
  numericAccuracy,
}: FinishedAccuracyNudgeProps) => {
  return numericAccuracy >= 90 ? (
    <p className="mb12">
      Great work! With an accuracy score of ≥90%, it might be worth starting the
      next lesson.
    </p>
  ) : (
    <p className="mb12">
      With an accuracy score lower than 90%, it might be worth repeating this
      lesson.
    </p>
  );
};

export default FinishedAccuracyNudge;
