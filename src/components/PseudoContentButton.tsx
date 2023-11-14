import React, { useEffect, useState } from "react";
import Clipboard from "clipboard";
import GoogleAnalytics from "react-ga4";

type Props = {
  children: React.ReactNode;
  className: string;
  dataClipboardTarget?: string;
  style?: any;
  onClick?: () => void;
};

const PseudoContentButton = (props: Props) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const clipboard = new Clipboard(".js-clipboard-button");
    setClicked(false);
    return () => {
      clipboard.destroy();
    };
  }, []);

  function animatedPseudoContent() {
    if (props.onClick) {
      props.onClick();
    }

    setClicked(true);

    const timeoutID = window.setTimeout(() => {
      window.clearTimeout(timeoutID);
      setClicked(false);
    }, 1000);

    let target = props.dataClipboardTarget;
    if (target === "#js-metwords-from-typey-type") {
      target = "Copied progress to clipboard";
    }
    if (target === "#js-custom-lesson-dictionary-entries") {
      target = "Copied custom lesson to clipboard";
    }
    if (target === "#js-your-words-for-dictionary-entries") {
      target = "Copied your words to clipboard";
    }

    if (target && target.includes("Copied progress")) {
      GoogleAnalytics.event({
        category: "Progress",
        action: "Copied progress",
        label: "Target: " + target,
      });
    } else if (target && target.includes("Copied")) {
      GoogleAnalytics.event({
        category: "Copy button",
        action: "Click",
        label: "Target: " + target,
      });
    } else if (target) {
      GoogleAnalytics.event({
        category: "Button",
        action: "Click",
        label: "Target: " + target,
      });
    } else if (
      props.children === "Load progress from text" ||
      props.children === "Load"
    ) {
      // already handled by Progress.js restoreButtonOnClickFunction() {}
    } else {
      GoogleAnalytics.event({
        category: "Button",
        action: "Click",
        label: "Target: NO_TARGET",
      });
    }
  }

  return (
    <button
      className={props.className + (clicked ? " fade-out-up" : "")}
      data-clipboard-target={props.dataClipboardTarget}
      onClick={animatedPseudoContent}
      style={props.style || {}}
    >
      {props.children}
    </button>
  );
};

export default PseudoContentButton;
