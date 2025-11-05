import GoogleAnalytics from "react-ga4";

export function changeShowStrokesInLesson(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const target = event.target;
  const value =
    target.type === "checkbox" ? target.checked : Boolean(target.value);

  // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
  this.setState({ showStrokesInLesson: value });
  const yourTypedText = document.getElementById("your-typed-text");
  if (yourTypedText) {
    yourTypedText.focus();
  }

  if (
    // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.state.lesson.title === "Custom" ||
    // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.state.lesson.title === this.state.customLesson.title
  ) {
    GoogleAnalytics.event({
      category: "Stroke hint",
      action: "Reveal",
      label: "CUSTOM_LESSON",
    });
  } else {
    let labelShowStrokesInLesson = "true";
    if (
      // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      this.state.lesson?.newPresentedMaterial?.current?.phrase &&
      // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      this.state.lesson?.newPresentedMaterial?.current?.stroke
    ) {
      labelShowStrokesInLesson =
        // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.state.lesson.newPresentedMaterial.current.phrase +
        ": " +
        // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.state.lesson.newPresentedMaterial.current.stroke;
    }

    GoogleAnalytics.event({
      category: "Stroke hint",
      action: "Reveal",
      label: labelShowStrokesInLesson,
    });
  }

  return value;
}

export function updateRevisionMaterial(
  event: React.ChangeEvent<HTMLInputElement>
) {
  // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
  let newCurrentLessonStrokes = this.state.currentLessonStrokes.map(
    // @ts-expect-error TS(7006) FIXME: Parameter 'stroke' implicitly has an 'any' type.
    (stroke) => ({ ...stroke })
  );
  const target = event.target;
  const checked =
    target.type === "checkbox" ? target.checked : Boolean(target.value);
  const name = target.name.replace(/-checkbox/, "");
  const index = name;

  newCurrentLessonStrokes[index].checked = checked;

  // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
  this.setState({ currentLessonStrokes: newCurrentLessonStrokes });
  return checked;
}
