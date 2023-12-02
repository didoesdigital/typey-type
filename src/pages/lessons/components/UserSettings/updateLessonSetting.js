import GoogleAnalytics from "react-ga4";

export function changeShowStrokesInLesson(event) {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;

  this.setState({ showStrokesInLesson: value });
  const yourTypedText = document.getElementById("your-typed-text");
  if (yourTypedText) {
    yourTypedText.focus();
  }

  if (this.props.location.pathname.includes("custom")) {
    GoogleAnalytics.event({
      category: "Stroke hint",
      action: "Reveal",
      label: "CUSTOM_LESSON",
    });
  } else {
    let labelShowStrokesInLesson = "true";
    try {
      labelShowStrokesInLesson =
        this.state.lesson.newPresentedMaterial.current.phrase +
        ": " +
        this.state.lesson.newPresentedMaterial.current.stroke;
    } catch {}

    GoogleAnalytics.event({
      category: "Stroke hint",
      action: "Reveal",
      label: labelShowStrokesInLesson,
    });
  }

  return value;
}
