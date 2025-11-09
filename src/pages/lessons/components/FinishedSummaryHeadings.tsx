import { useEffect, useMemo, useRef, useState } from "react";
import * as React from "react";
import * as Confetti from "../../../utils/confetti";
import getHeadingsText from "../utilities/getHeadingsText";

export type ConfettiConfig = {
  sparsity: number;
  colors: number;
} | null;

type FinishedSummaryHeadingsProps = {
  confettiConfig: ConfettiConfig;
  lessonTitle: string;
  newTopSpeedPersonalBest: boolean;
  newTopSpeedToday: boolean;
  wpm: number;
};

const particles: any = [];

const restartConfetti = (
  event: any,
  confettiConfig: ConfettiConfig,
  canvas: any,
  canvasWidth: number,
  canvasHeight: number
) => {
  if (
    event &&
    ((event.keyCode && event.keyCode === 13) || event.type === "click")
  ) {
    particles.splice(0);
    Confetti.cancelAnimation();
    if (confettiConfig !== null) {
      Confetti.setupCanvas(
        confettiConfig,
        "finished-summary-heading",
        particles
      );
    }
    Confetti.restartAnimation(particles, canvas, canvasWidth, canvasHeight);
  }
};

const FinishedSummaryHeadings = ({
  confettiConfig,
  lessonTitle,
  newTopSpeedPersonalBest,
  newTopSpeedToday,
  wpm,
}: FinishedSummaryHeadingsProps) => {
  const finishedHeadingRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasWidth] = useState(Math.floor(window.innerWidth));
  const [canvasHeight] = useState(Math.floor(window.innerHeight));

  useEffect(() => {
    finishedHeadingRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (confettiConfig !== null) {
      Confetti.setupCanvas(
        confettiConfig,
        "finished-summary-heading",
        particles
      );
      Confetti.restartAnimation(
        particles,
        canvasRef.current,
        canvasWidth,
        canvasHeight
      );
    }
  }, [confettiConfig, canvasWidth, canvasHeight]);

  const confettiTrigger = (
    event:
      | React.MouseEvent<HTMLHeadingElement>
      | React.KeyboardEvent<HTMLHeadingElement>
  ) =>
    restartConfetti(
      event,
      confettiConfig,
      canvasRef.current,
      canvasWidth,
      canvasHeight
    );

  const [headingText, subHeadingText] = useMemo(
    () =>
      getHeadingsText(
        wpm,
        lessonTitle,
        newTopSpeedToday,
        newTopSpeedPersonalBest
      ),
    [lessonTitle, newTopSpeedPersonalBest, newTopSpeedToday, wpm]
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="fixed celebration-canvas top-0 left-0 pointer-none"
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Text_labels_and_names#content_with_images_must_be_labeled
        // https://dequeuniversity.com/rules/axe/4.10/role-img-alt
        // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
        role="presentation"
      />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <h3
        className="dib text-center mt3"
        ref={finishedHeadingRef}
        tabIndex={-1}
        id="finished-summary-heading"
        onClick={confettiTrigger}
        onKeyDown={confettiTrigger}
      >
        {headingText}
      </h3>
      <p>{subHeadingText}</p>
    </>
  );
};

export default FinishedSummaryHeadings;
