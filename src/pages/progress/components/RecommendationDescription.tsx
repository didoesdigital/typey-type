import React from "react";

import type { FullRecommendationsStudyType } from "../../../types";

type Props = {
  studyType: FullRecommendationsStudyType;
};

const RecommendationDescription = ({ studyType }: Props) => {
  let description;

  switch (studyType) {
    case "error":
      description = (
        <>
          Unable to fetch the recommendation course. Check your Internet
          connection and try <a href=".">refresh the page</a>.
        </>
      );
      break;

    case "practice":
      description = (
        <>
          Practice a longer lesson and mimic real usage as closely as possible.
          Write as fast as you can without causing misstrokes. Explore classic
          stories that use simple and common sentences.
        </>
      );
      break;

    case "drill":
      description = (
        <>
          Regularly drill common words to build up your muscle memory. Write as
          fast as you can, aiming for a high speed score. Pick specific drills
          that focus on similar words.
        </>
      );
      break;

    case "revise":
      description = (
        <>
          Revise lessons with lots of words you want to memorise, like the top
          100 words. Try to recall briefs before revealing their strokes. Avoid
          fingerspelling or writing out words in long form.
        </>
      );
      break;

    case "discover":
      description = (
        <>
          Discover new words without hiding their briefs while you learn to
          write them. Write slowly, concentrating on accuracy and forming good
          habits around how you stroke word parts.
        </>
      );
      break;

    case "compete":
      description = (
        <>
          To really push your speed and vocabulary, you might add some
          competition. Try a race. Unexpected material can also teach you to how
          to adapt to unknown words under pressure.
        </>
      );
      break;

    case "game":
      description = (
        <>
          You’ve been so diligent! You might take a break from drilling and try
          a game. Steno games let you make mistakes and think differently about
          what you’ve learned.
        </>
      );
      break;

    case "wildcard":
      description = (
        <>
          Well done! You’ve typed a lot of words today. You might rest your
          hands and your mind for now, and come back in 4+&nbsp;hours.
        </>
      );
      break;

    case "break":
      description = (
        <>
          Well done! You’ve typed a lot of words today. You might rest your
          hands and your mind for now. Save your progress and take
          5&nbsp;minutes or come back in 4+&nbsp;hours.
        </>
      );
      break;

    default:
      description = (
        <>
          Practice writing as fast as you can without causing misstrokes using
          simple sentences and common words.
        </>
      );
      break;
  }

  return <p className="mb3">{description}</p>;
};

export default RecommendationDescription;
