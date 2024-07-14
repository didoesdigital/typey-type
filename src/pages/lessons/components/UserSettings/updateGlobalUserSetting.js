import GoogleAnalytics from "react-ga4";
import { useSetAtom } from "jotai";
import {
  backupBannerDismissedTime,
  experimentsState,
  inputForKAOESState,
  writerInputState
} from "../../../../states/globalUserSettingsState";

// (event: SyntheticInputEvent<HTMLInputElement>) => void
export function useChangeWriterInput() {
  const setState = useSetAtom(writerInputState);
  return (event) => {
    let name = "BAD_INPUT";

    if (event && event.target && event.target.name) {
      setState(event.target.name);
      name = event.target.name;
    }

    let labelString = name;
    if (!name) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "Global user settings",
      action: "Change writer input",
      label: labelString,
    });
  }
}

export function useChangeInputForKAOES() {
  const setState = useSetAtom(inputForKAOESState);
  return (event) => {
    let name = "BAD_INPUT";

    if (event && event.target && event.target.name) {
      setState(event.target.name);
      name = event.target.name;
    }

    let labelString = name;
    if (!name) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "Global user settings",
      action: "Change input for KAOES",
      label: labelString,
    });
  }
}

export function useToggleExperiment() {
  const setState = useSetAtom(experimentsState);
  return (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    setState(name, value);

    let labelString = value;
    if (value === undefined) {
      labelString = "BAD_INPUT";
    } else {
      labelString.toString();
    }

    GoogleAnalytics.event({
      category: "Global user settings",
      action: "Change " + name,
      label: labelString,
    });
  }
}

export function useDismissBackupBanner() {
  const setState = useSetAtom(backupBannerDismissedTime);
  return () => {
    setState(Date.now());

    let labelString = "Dismiss";

    GoogleAnalytics.event({
      category: "Global user settings",
      action: "Dismiss backup banner",
      label: labelString,
    });
  }
}
